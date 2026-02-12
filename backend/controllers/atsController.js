import groqService from '../services/groqService.js';
import { extractTextFromFile } from '../utils/fileParser.js';

export const analyzeResume = async (req, res) => {
    try {
        const { resumeData, jobDescription } = req.body;

        if (!resumeData || !jobDescription) {
            return res.status(400).json({
                success: false,
                message: 'Resume data and job description are required'
            });
        }

        const date = new Date().toISOString();
        console.log(`[${date}] 🧪 Analyzing resume for ATS compatibility...`);

        const analysis = await groqService.calculateATSScore(resumeData, jobDescription);

        res.status(200).json({
            success: true,
            data: analysis
        });
    } catch (error) {
        console.error('ATS Analysis Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to analyze resume'
        });
    }
};

// New controller for uploaded file analysis
export const analyzeUploadedResume = async (req, res) => {
    try {
        const { jobDescription } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a resume file (PDF or DOCX)'
            });
        }

        if (!jobDescription) {
            return res.status(400).json({
                success: false,
                message: 'Job description is required'
            });
        }

        const date = new Date().toISOString();
        console.log(`[${date}] 📄 Extracting text from uploaded file: ${file.originalname}`);

        // Extract text from uploaded file
        const resumeText = await extractTextFromFile(file);

        if (!resumeText || resumeText.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Could not extract text from the uploaded file'
            });
        }

        console.log(`[${date}] 🧪 Analyzing uploaded resume for ATS compatibility...`);

        // Use the optimizeForATSContent method for raw text
        const analysis = await groqService.calculateATSScoreFromText(resumeText, jobDescription);

        res.status(200).json({
            success: true,
            data: analysis
        });
    } catch (error) {
        console.error('File Upload ATS Analysis Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to analyze uploaded resume'
        });
    }
};

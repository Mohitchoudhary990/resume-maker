import groqService from '../services/groqService.js';

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

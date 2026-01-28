import geminiService from '../services/groqService.js';
import pdfService from '../services/pdfService.js';
import Resume from '../models/Resume.js';

// @desc    Generate professional summary using AI
// @route   POST /api/ai/generate-summary
// @access  Private
export const generateSummary = async (req, res) => {
    try {
        console.log('📝 Generate Summary Request received');
        console.log('Request body:', JSON.stringify(req.body, null, 2));

        const { personalInfo, experience, education } = req.body;

        console.log('Calling Gemini service...');
        const summary = await geminiService.generateSummary(personalInfo, experience, education);

        console.log('✅ Summary generated successfully:', summary.substring(0, 50) + '...');

        res.status(200).json({
            success: true,
            data: { summary }
        });
    } catch (error) {
        console.error('❌ Generate summary error:', error.message);
        console.error('Full error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate summary'
        });
    }
};

// @desc    Improve job description using AI
// @route   POST /api/ai/improve-description
// @access  Private
export const improveDescription = async (req, res) => {
    try {
        const { description, position, company } = req.body;

        if (!description || !position) {
            return res.status(400).json({
                success: false,
                message: 'Please provide description and position'
            });
        }

        const improvedDescription = await geminiService.improveJobDescription(
            description,
            position,
            company
        );

        res.status(200).json({
            success: true,
            data: { improvedDescription }
        });
    } catch (error) {
        console.error('Improve description error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to improve description'
        });
    }
};

// @desc    Suggest skills using AI
// @route   POST /api/ai/suggest-skills
// @access  Private
export const suggestSkills = async (req, res) => {
    try {
        const { position, experience, currentSkills } = req.body;

        if (!position) {
            return res.status(400).json({
                success: false,
                message: 'Please provide position'
            });
        }

        const skills = await geminiService.suggestSkills(position, experience || [], currentSkills);

        res.status(200).json({
            success: true,
            data: { skills }
        });
    } catch (error) {
        console.error('Suggest skills error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to suggest skills'
        });
    }
};

// @desc    Generate project description using AI
// @route   POST /api/ai/generate-project-description
// @access  Private
export const generateProjectDescription = async (req, res) => {
    try {
        const { projectName, technologies } = req.body;

        if (!projectName || !technologies) {
            return res.status(400).json({
                success: false,
                message: 'Please provide project name and technologies'
            });
        }

        const description = await geminiService.generateProjectDescription(
            projectName,
            technologies
        );

        res.status(200).json({
            success: true,
            data: { description }
        });
    } catch (error) {
        console.error('Generate project description error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate project description'
        });
    }
};

// @desc    Get ATS optimization tips
// @route   POST /api/ai/optimize-ats
// @access  Private
export const optimizeATS = async (req, res) => {
    try {
        const { resumeData, targetJobDescription } = req.body;

        const tips = await geminiService.optimizeForATS(resumeData, targetJobDescription);

        res.status(200).json({
            success: true,
            data: { tips }
        });
    } catch (error) {
        console.error('Optimize ATS error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to optimize for ATS'
        });
    }
};

// @desc    Get resume advice
// @route   POST /api/ai/get-advice
// @access  Private
export const getAdvice = async (req, res) => {
    try {
        const { section, content } = req.body;

        if (!section || !content) {
            return res.status(400).json({
                success: false,
                message: 'Please provide section and content'
            });
        }

        const advice = await geminiService.getResumeAdvice(section, content);

        res.status(200).json({
            success: true,
            data: { advice }
        });
    } catch (error) {
        console.error('Get advice error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to get advice'
        });
    }
};

// @desc    Generate PDF for resume
// @route   GET /api/ai/generate-pdf/:id
// @access  Private
export const generatePDF = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        // Make sure user owns resume
        if (resume.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this resume'
            });
        }

        const pdfBuffer = await pdfService.generateResumePDF(resume, resume.template);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${resume.title || 'resume'}.pdf"`);
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Generate PDF error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate PDF'
        });
    }
};

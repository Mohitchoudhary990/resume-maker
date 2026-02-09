import api from './api';

// Generate professional summary
export const generateSummary = async (data) => {
    try {
        const response = await api.post('/ai/generate-summary', data);
        return response.data;
    } catch (error) {
        console.error('AI Service Error (generateSummary):', error);
        throw error;
    }
};

// Improve job description
export const improveDescription = async (data) => {
    try {
        const response = await api.post('/ai/improve-description', data);
        return response.data;
    } catch (error) {
        console.error('AI Service Error (improveDescription):', error);
        throw error;
    }
};

// Suggest skills
export const suggestSkills = async (data) => {
    try {
        const response = await api.post('/ai/suggest-skills', data);
        return response.data;
    } catch (error) {
        console.error('AI Service Error (suggestSkills):', error);
        throw error;
    }
};

// Generate project description
export const generateProjectDescription = async (data) => {
    try {
        const response = await api.post('/ai/generate-project-description', data);
        return response.data;
    } catch (error) {
        console.error('AI Service Error (generateProjectDescription):', error);
        throw error;
    }
};

// Get ATS optimization tips
export const optimizeATS = async (data) => {
    try {
        const response = await api.post('/ai/optimize-ats', data);
        return response.data;
    } catch (error) {
        console.error('AI Service Error (optimizeATS):', error);
        throw error;
    }
};

// Get ATS optimization tips for uploaded file
export const optimizeATSFile = async (data) => {
    try {
        const response = await api.post('/ai/optimize-ats-file', data);
        return response.data;
    } catch (error) {
        console.error('AI Service Error (optimizeATSFile):', error);
        throw error;
    }
};

// Get resume advice

// Get resume advice
export const getAdvice = async (data) => {
    try {
        const response = await api.post('/ai/get-advice', data);
        return response.data;
    } catch (error) {
        console.error('AI Service Error (getAdvice):', error);
        throw error;
    }
};

// Generate PDF
export const generatePDF = async (id) => {
    try {
        const response = await api.get(`/ai/generate-pdf/${id}`, {
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        console.error('AI Service Error (generatePDF):', error);
        throw error;
    }
};

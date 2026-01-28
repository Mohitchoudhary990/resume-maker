import api from './api';

// Get all resumes
export const getResumes = async () => {
    const response = await api.get('/resumes');
    return response.data;
};

// Get single resume
export const getResume = async (id) => {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
};

// Create resume
export const createResume = async (resumeData) => {
    const response = await api.post('/resumes', resumeData);
    return response.data;
};

// Update resume
export const updateResume = async (id, resumeData) => {
    const response = await api.put(`/resumes/${id}`, resumeData);
    return response.data;
};

// Delete resume
export const deleteResume = async (id) => {
    const response = await api.delete(`/resumes/${id}`);
    return response.data;
};

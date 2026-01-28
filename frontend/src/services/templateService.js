import axios from 'axios';

const API_URL = 'http://localhost:5000/api/templates';

export const getTemplates = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch templates';
    }
};

export const createTemplate = async (templateData) => {
    try {
        const response = await axios.post(API_URL, templateData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to create template';
    }
};

export const deleteTemplate = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to delete template';
    }
};

export const seedTemplates = async () => {
    try {
        const response = await axios.post(`${API_URL}/seed`, {}, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to seed templates';
    }
};

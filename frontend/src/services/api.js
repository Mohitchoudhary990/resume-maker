import axios from 'axios';

const API_URL = '/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // Send cookies with requests
});

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Don't redirect if it's the check-auth endpoint
        if (error.response?.status === 401 && !error.config.url.includes('/auth/me')) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;

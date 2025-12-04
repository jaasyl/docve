import axios from 'axios';

const API_BASE_URL = 'https://docve.azurewebsites.net/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle Errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with a status code outside 2xx range
            console.error('API Error:', error.response.data);
            if (error.response.status === 401) {
                // Handle unauthorized access (e.g., redirect to login)
                console.warn('Unauthorized access. Redirecting to login...');
                // Optional: window.location.href = '/login';
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('Network Error:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;

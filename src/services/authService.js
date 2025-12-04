import api from './api';

const authService = {
    /**
     * Authenticate user and return JWT token
     * @param {string} username 
     * @param {string} password 
     * @returns {Promise<Object>} - Login result with token
     */
    login: async (username, password) => {
        const response = await api.post('/Auth/login', {
            username,
            password
        });

        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    },

    /**
     * Validate the current JWT token
     * @returns {Promise<Object>}
     */
    validateToken: async () => {
        return await api.get('/Auth/validate');
    },

    /**
     * Hash a password for testing purposes (Development only)
     * @param {string} password 
     * @returns {Promise<string>}
     */
    hashPassword: async (password) => {
        const response = await api.post('/Auth/hash-password', JSON.stringify(password));
        return response.data;
    },

    /**
     * Logout user
     */
    logout: () => {
        localStorage.removeItem('token');
    }
};

export default authService;

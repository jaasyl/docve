import api from './api';

/**
 * Users API Service
 * All functions use the centralized axios instance with automatic token injection
 */

// ==================== User CRUD Operations ====================

/**
 * Create a new user (Signup)
 * @param {Object} userData - User data
 * @param {string} userData.username - Username
 * @param {string} userData.email - Email address
 * @param {string} userData.password - Password
 * @param {string} userData.role - User role (default: "EndUser")
 * @returns {Promise} Created user object
 */
export const createUser = async (userData) => {
    const response = await api.post('/Users', {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'EndUser',
    });
    return response.data;
};

/**
 * Get all users
 * @param {Object} params - Query parameters (optional)
 * @returns {Promise} Array of users
 */
export const getUsers = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `/Users?${queryString}` : '/Users';
    const response = await api.get(url);
    return response.data;
};

/**
 * Get user by ID
 * @param {string|number} userId - User ID
 * @returns {Promise} User object
 */
export const getUserById = async (userId) => {
    const response = await api.get(`/Users/${userId}`);
    return response.data;
};

/**
 * Update user
 * @param {string|number} userId - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise} Updated user object
 */
export const updateUser = async (userId, userData) => {
    const response = await api.put(`/Users/${userId}`, userData);
    return response.data;
};

/**
 * Delete user
 * @param {string|number} userId - User ID
 * @returns {Promise} Deletion response
 */
export const deleteUser = async (userId) => {
    const response = await api.delete(`/Users/${userId}`);
    return response.data;
};

/**
 * Get user count
 * @returns {Promise<number>} Total number of users
 */
export const getUsersCount = async () => {
    const response = await api.get('/Users/count');
    return response.data;
};

// ==================== User Profile Operations ====================

/**
 * Create user profile
 * @param {string|number} userId - User ID
 * @param {Object} profileData - Profile data
 * @returns {Promise} Created profile object
 */
export const createUserProfile = async (userId, profileData) => {
    const response = await api.post(`/Users/${userId}/profile`, profileData);
    return response.data;
};

/**
 * Update user profile
 * @param {string|number} userId - User ID
 * @param {Object} profileData - Updated profile data
 * @returns {Promise} Updated profile object
 */
export const updateUserProfile = async (userId, profileData) => {
    const response = await api.put(`/Users/${userId}/profile`, profileData);
    return response.data;
};

/**
 * Delete user profile
 * @param {string|number} userId - User ID
 * @returns {Promise} Deletion response
 */
export const deleteUserProfile = async (userId) => {
    const response = await api.delete(`/Users/${userId}/profile`);
    return response.data;
};

// ==================== Password Management ====================

/**
 * Change user password
 * @param {string|number} userId - User ID
 * @param {Object} passwordData - Password change data
 * @param {string} passwordData.currentPassword - Current password
 * @param {string} passwordData.newPassword - New password
 * @returns {Promise} Password change response
 */
export const changePassword = async (userId, passwordData) => {
    const response = await api.post(`/Users/${userId}/change-password`, passwordData);
    return response.data;
};

import api from './api';

/**
 * Shelves API Service
 * All functions use the centralized axios instance with automatic token injection
 */

// ==================== Shelf CRUD Operations ====================

/**
 * Get all shelves
 * @param {string} search - Optional search query
 * @returns {Promise} Array of shelves
 */
export const getAllShelves = async (search = '') => {
    const url = search ? `/Shelves?search=${encodeURIComponent(search)}` : '/Shelves';
    const response = await api.get(url);
    return response.data;
};

/**
 * Create a new shelf
 * @param {Object} shelfData - Shelf data (name, description, type, etc.)
 * @returns {Promise} Created shelf object
 */
export const createShelf = async (shelfData) => {
    const response = await api.post('/Shelves', shelfData);
    return response.data;
};

/**
 * Get a single shelf by ID
 * @param {string|number} shelfId - Shelf ID
 * @returns {Promise} Shelf object
 */
export const getShelfById = async (shelfId) => {
    const response = await api.get(`/Shelves/${shelfId}`);
    return response.data;
};

/**
 * Update a shelf
 * @param {string|number} shelfId - Shelf ID
 * @param {Object} shelfData - Updated shelf data
 * @returns {Promise} Updated shelf object
 */
export const updateShelf = async (shelfId, shelfData) => {
    const response = await api.put(`/Shelves/${shelfId}`, shelfData);
    return response.data;
};

/**
 * Delete a shelf
 * @param {string|number} shelfId - Shelf ID
 * @returns {Promise} Deletion response
 */
export const deleteShelf = async (shelfId) => {
    const response = await api.delete(`/Shelves/${shelfId}`);
    return response.data;
};

// ==================== Shelf Access Management ====================

/**
 * Get all users with access to a shelf
 * @param {string|number} shelfId - Shelf ID
 * @returns {Promise} Array of users with access
 */
export const getShelfAccess = async (shelfId) => {
    const response = await api.get(`/Shelves/${shelfId}/access`);
    return response.data;
};

/**
 * Add user access to a shelf
 * @param {string|number} shelfId - Shelf ID
 * @param {Object} accessData - Access data (userId, permission, etc.)
 * @returns {Promise} Created access object
 */
export const addShelfAccess = async (shelfId, accessData) => {
    const response = await api.post(`/Shelves/${shelfId}/access`, accessData);
    return response.data;
};

/**
 * Remove user access from a shelf
 * @param {string|number} shelfId - Shelf ID
 * @param {string|number} userId - User ID to remove
 * @returns {Promise} Deletion response
 */
export const removeShelfAccess = async (shelfId, userId) => {
    const response = await api.delete(`/Shelves/${shelfId}/access/${userId}`);
    return response.data;
};

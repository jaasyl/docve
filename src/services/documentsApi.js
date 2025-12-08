import api from './api';

/**
 * Documents API Service
 * All functions use the centralized axios instance with automatic token injection
 */

// ==================== Document Retrieval ====================

/**
 * Get all documents in a specific shelf
 * @param {string|number} shelfId - Shelf ID
 * @returns {Promise} Array of documents
 */
export const getDocumentsByShelf = async (shelfId) => {
    const response = await api.get(`/Documents/shelf/${shelfId}`);
    return response.data;
};

/**
 * Get a single document by ID
 * @param {string|number} documentId - Document ID
 * @returns {Promise} Document object
 */
export const getDocumentById = async (documentId) => {
    const response = await api.get(`/Documents/${documentId}`);
    return response.data;
};

// ==================== Document Upload ====================

/**
 * Upload a document to a shelf
 * @param {File} file - The file to upload
 * @param {string|number} shelfId - Destination shelf ID
 * @param {string} tags - Comma-separated tags (optional)
 * @param {string} description - Document description (optional)
 * @param {Function} onUploadProgress - Progress callback function
 * @returns {Promise} Uploaded document object
 */
export const uploadDocument = async (file, shelfId, tags = '', description = '', onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('shelfId', shelfId);

    if (tags) {
        formData.append('tags', tags);
    }

    if (description) {
        formData.append('description', description);
    }

    const response = await api.post('/Documents/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            if (onUploadProgress) {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onUploadProgress(percentCompleted);
            }
        },
    });

    return response.data;
};

// ==================== Document Status Management ====================

/**
 * Mark a document as successfully indexed
 * @param {string|number} documentId - Document ID
 * @returns {Promise} Updated document object
 */
export const markDocumentIndexed = async (documentId) => {
    const response = await api.post(`/Documents/${documentId}/mark-indexed`);
    return response.data;
};

/**
 * Mark a document indexing as failed
 * @param {string|number} documentId - Document ID
 * @returns {Promise} Updated document object
 */
export const markDocumentFailed = async (documentId) => {
    const response = await api.post(`/Documents/${documentId}/mark-failed`);
    return response.data;
};

/**
 * Mark a document as removed
 * @param {string|number} documentId - Document ID
 * @returns {Promise} Updated document object
 */
export const markDocumentRemoved = async (documentId) => {
    const response = await api.post(`/Documents/${documentId}/mark-removed`);
    return response.data;
};

// ==================== Document Deletion ====================

/**
 * Delete a document permanently
 * @param {string|number} documentId - Document ID
 * @returns {Promise} Deletion response
 */
export const deleteDocument = async (documentId) => {
    const response = await api.delete(`/Documents/${documentId}`);
    return response.data;
};

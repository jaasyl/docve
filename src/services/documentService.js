import api from './api';

const documentService = {
    /**
     * Get all documents accessible by the current user
     * @returns {Promise<Array>}
     */
    getAllDocuments: async () => {
        const response = await api.get('/Documents');
        return response.data;
    },

    /**
     * Get a document by ID
     * @param {string} id 
     * @returns {Promise<Object>}
     */
    getDocumentById: async (id) => {
        const response = await api.get(`/Documents/${id}`);
        return response.data;
    },

    /**
     * Get documents by shelf ID
     * @param {string} shelfId 
     * @returns {Promise<Array>}
     */
    getDocumentsByShelf: async (shelfId) => {
        const response = await api.get(`/Documents/shelf/${shelfId}`);
        return response.data;
    },

    /**
     * Search documents by name
     * @param {string} searchTerm 
     * @returns {Promise<Array>}
     */
    searchDocuments: async (searchTerm) => {
        const response = await api.get(`/Documents/search?searchTerm=${encodeURIComponent(searchTerm)}`);
        return response.data;
    },

    /**
     * Update a document
     * @param {string} id 
     * @param {Object} data 
     * @returns {Promise<Object>}
     */
    updateDocument: async (id, data) => {
        const response = await api.put(`/Documents/${id}`, data);
        return response.data;
    },

    /**
     * Delete a document
     * @param {string} id 
     * @returns {Promise<void>}
     */
    deleteDocument: async (id) => {
        await api.delete(`/Documents/${id}`);
    },

    /**
     * Upload a document
     * @param {File} file 
     * @param {string} shelfId 
     * @returns {Promise<Object>}
     */
    uploadDocument: async (file, shelfId) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('shelfId', shelfId);

        const response = await api.post('/Documents/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
};

export default documentService;

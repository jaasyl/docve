import api from './api';

const shelfService = {
    getShelves: async () => {
        const response = await api.get('/Shelves');
        return response.data;
    },
    createShelf: async (data) => {
        const response = await api.post('/Shelves', data);
        return response.data;
    },
    getShelfById: async (id) => {
        const response = await api.get(`/Shelves/${id}`);
        return response.data;
    },
    updateShelf: async (id, data) => {
        const response = await api.put(`/Shelves/${id}`, data);
        return response.data;
    },
    deleteShelf: async (id) => {
        await api.delete(`/Shelves/${id}`);
    },
    getShelfAccess: async (id) => {
        const response = await api.get(`/Shelves/${id}/access`);
        return response.data;
    },
    grantShelfAccess: async (id, data) => {
        const response = await api.post(`/Shelves/${id}/access`, data);
        return response.data;
    },
    revokeShelfAccess: async (id, userId) => {
        await api.delete(`/Shelves/${id}/access/${userId}`);
    }
};

export default shelfService;

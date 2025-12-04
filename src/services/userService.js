import api from './api';

const userService = {
    getUsers: async () => {
        const response = await api.get('/Users');
        return response.data;
    },
    createUser: async (data) => {
        const response = await api.post('/Users', data);
        return response.data;
    },
    getUserById: async (id) => {
        const response = await api.get(`/Users/${id}`);
        return response.data;
    },
    updateUser: async (id, data) => {
        const response = await api.put(`/Users/${id}`, data);
        return response.data;
    },
    deleteUser: async (id) => {
        await api.delete(`/Users/${id}`);
    },
    changePassword: async (id, data) => {
        const response = await api.post(`/Users/${id}/change-password`, data);
        return response.data;
    },
    getUserCount: async () => {
        const response = await api.get('/Users/count');
        return response.data;
    },
    createUserProfile: async (id, data) => {
        const response = await api.post(`/Users/${id}/profile`, data);
        return response.data;
    },
    updateUserProfile: async (id, data) => {
        const response = await api.put(`/Users/${id}/profile`, data);
        return response.data;
    },
    deleteUserProfile: async (id) => {
        await api.delete(`/Users/${id}/profile`);
    }
};

export default userService;

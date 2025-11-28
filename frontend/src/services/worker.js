import api from './api';

const workerService = {
    // Worker Profile
    getProfile: async () => {
        const response = await api.get('/worker/profile', {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}` }
        });
        return response.data;
    },

    updateProfile: async (profileData) => {
        const response = await api.put('/worker/profile', profileData, {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}` }
        });
        return response.data;
    },

    getReviews: async () => {
        const response = await api.get('/worker/reviews', {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}` }
        });
        return response.data;
    },

    // Search Workers (for farmers)
    searchWorkers: async (filters) => {
        const response = await api.get('/worker/search', {
            params: filters,
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}` }
        });
        return response.data;
    }
};

export default workerService;

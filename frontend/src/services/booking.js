import api from './api';

const bookingService = {
    // Create Booking (Farmer)
    createBooking: async (bookingData) => {
        const response = await api.post('/bookings', bookingData, {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}` }
        });
        return response.data;
    },

    // Get Worker's Bookings
    getWorkerBookings: async () => {
        const response = await api.get('/bookings/worker', {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}` }
        });
        return response.data;
    },

    // Get Farmer's Bookings
    getFarmerBookings: async () => {
        const response = await api.get('/bookings/farmer', {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}` }
        });
        return response.data;
    },

    // Update Booking Status
    updateStatus: async (bookingId, status) => {
        const response = await api.put(`/bookings/${bookingId}/status`, { status }, {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}` }
        });
        return response.data;
    },

    // Create Review
    createReview: async (reviewData) => {
        const response = await api.post('/bookings/review', reviewData, {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}` }
        });
        return response.data;
    },

    // Get Earnings
    getEarnings: async () => {
        const response = await api.get('/bookings/earnings', {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userData')).token}` }
        });
        return response.data;
    }
};

export default bookingService;

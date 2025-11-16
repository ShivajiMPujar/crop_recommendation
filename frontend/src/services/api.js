import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to build Authorization header from stored userData
export const getAuthHeaders = () => {
  try {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const token = userData?.token || '';
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (err) {
    return {};
  }
};

// Crop APIs
export const cropAPI = {
  recommend: (data) => api.post('/crops/recommend', data),
  getAll: () => api.get('/crops'),
  getById: (id) => api.get(`/crops/${id}`)
};

// Seed APIs
export const seedAPI = {
  getByCrop: (cropName, district) => api.get('/seeds', { 
    params: { cropName, district } 
  }),
  getByCropPath: (cropName) => api.get(`/seeds/crop/${encodeURIComponent(cropName)}`),
  getAll: (filters) => api.get('/seeds', { params: filters })
};

// Store APIs
export const storeAPI = {
  getByDistrict: (district, type) => api.get('/stores', { 
    params: { district, type } 
  }),
  getAll: (filters) => api.get('/stores', { params: filters })
};

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getUser: (email) => api.get(`/auth/user/${email}`)
};

// Admin APIs
export const adminAPI = {
  login: (credentials) => api.post('/admin/login', credentials),
  getStats: (config) => api.get('/admin/stats', config),
  getUsers: (config) => api.get('/admin/users', config),
  updateUserStatus: (id, payload, config) => api.put(`/admin/users/${id}/status`, payload, config),
  deleteUser: (id, config) => api.delete(`/admin/users/${id}`, config)
};

export default api;
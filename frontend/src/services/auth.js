import { authAPI } from './api';

const authService = {
  register: async (userData) => {
    console.log('authService.register - Sending data:', userData);
    const res = await authAPI.register(userData);
    console.log('authService.register - Received response:', res.data);
    return res.data;
  },

  login: async (credentials) => {
    console.log('authService.login - Sending credentials:', credentials);
    const res = await authAPI.login(credentials);
    console.log('authService.login - Received response:', res.data);
    return res.data;
  }
};

export default authService;

import api from './api';
export const getAbout = () => api.get('/about');
export const updateAbout = (data) => api.put('/about', data);

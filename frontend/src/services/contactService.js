import api from './api';
export const submitContact = (data) => api.post('/contact', data);
export const getMessages = () => api.get('/contact');
export const markAsRead = (id) => api.put(`/contact/${id}`);
export const deleteMessage = (id) => api.delete(`/contact/${id}`);

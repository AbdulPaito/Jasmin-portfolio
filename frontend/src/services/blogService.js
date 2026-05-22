import api from './api';
export const getBlogs = (params) => api.get('/blogs', { params });
export const getAllBlogs = () => api.get('/blogs/all');
export const getBlogBySlug = (slug) => api.get(`/blogs/${slug}`);
export const createBlog = (data) => api.post('/blogs', data);
export const updateBlog = (id, data) => api.put(`/blogs/edit/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/edit/${id}`);

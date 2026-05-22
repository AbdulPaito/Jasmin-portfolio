import axios from 'axios';

// Create Axios instance with base URL from env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Request interceptor — attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    if (config.headers && config.headers.set) {
      config.headers.set('Authorization', `Bearer ${token}`);
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor — handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname.startsWith('/dashboard')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

import api from './api';

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/upload', formData);
    return data;
  } catch (error) {
    console.error('Upload error detail:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteFile = (public_id) => api.delete('/upload', { data: { public_id } });

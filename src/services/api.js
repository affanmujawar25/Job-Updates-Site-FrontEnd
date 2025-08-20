import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Jobs
export const getFeaturedJobs = () => api.get('/jobs?limit=3');
export const getAllJobs = () => api.get('/jobs');
export const getJobById = (id) => api.get(`/jobs/${id}`);
export const createJob = (formData) => {
  return api.post('/jobs', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const updateJob = (id, formData) => {
  return api.put(`/jobs/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const deleteJob = (id) => api.delete(`/jobs/${id}`);

// Admin
export const adminLogin = (username, password) => api.post('/admin/login', { username, password });

// Contact
export const submitContactForm = (data) => api.post('/contact', data);
export const getAllContactQueries = () => api.get('/contact');
export const getContactCount = () => api.get('/contact/count');

// Stats
export const getJobCount = () => api.get('/jobs/count');

export default api;
import api from './api';

export const getFeaturedJobs = async () => {
  const response = await api.getFeaturedJobs();
  return response.data;
};

export const getAllJobs = async () => {
  const response = await api.getAllJobs();
  return response.data;
};

export const getJobById = async (id) => {
  const response = await api.getJobById(id);
  return response.data;
};

export const createJob = async (formData) => {
  const response = await api.createJob(formData);
  return response.data;
};

export const updateJob = async (id, formData) => {
  const response = await api.updateJob(id, formData);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await api.deleteJob(id);
  return response.data;
};
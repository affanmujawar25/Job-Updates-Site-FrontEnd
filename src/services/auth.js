import { adminLogin } from './api';

export const login = async (username, password) => {
  try {
    const response = await adminLogin(username, password);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
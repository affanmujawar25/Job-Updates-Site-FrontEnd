import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { login as apiLogin } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedAdmin = localStorage.getItem('admin');

    if (storedToken && storedAdmin) {
      setToken(storedToken);
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const { token, admin } = await apiLogin(username, password);
      setToken(token);
      setAdmin(admin);
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));
      toast.success('Login successful');
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
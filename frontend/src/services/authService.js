// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/users';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
    const response = await axios.post('/api/users/login', userData);
  
    // Logging the response to verify token
    console.log('Login Response:', response.data);
  
    // Ensure the token is stored correctly
    localStorage.setItem('token', response.data.token);
  
    // Log the token from localStorage to verify
    console.log('Token saved in localStorage:', localStorage.getItem('token'));
  
    return response.data;
  };

const getProfile = async (token) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  register,
  login,
  getProfile,
};

// src/services/collectionService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/collections';
const token = localStorage.getItem('token'); // Make sure the token is retrieved correctly

const config = {
  headers: {
    Authorization: `Bearer ${token}`, // Include the token here
  },
};

const createCollection = async (collectionData) => {
    const token = localStorage.getItem('token');
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure the token is included
      },
    };
  
    // Log to check if token is passed correctly
    console.log('Sending token with request:', token);
  
    const response = await axios.post('/api/collections/create', collectionData, config);
  
    return response.data;
};

const getCollections = async (token) => {
  const response = await axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  createCollection,
  getCollections,
};

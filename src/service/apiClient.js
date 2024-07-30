// src/services/apiClient.js
import axios from 'axios';
import store from '@/store'; // Ensure you have the correct path to your store

const apiClient = axios.create({
  baseURL: 'https://api-v2-dev.farm2feed.com/api', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  // Retrieve the token from local storage or any global state management
  const token = localStorage.getItem('authToken'); // Example of token retrieval
  console.log("token ", token)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});


export default apiClient;

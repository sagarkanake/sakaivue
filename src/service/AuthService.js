// src/services/AuthService.js
import apiClient from './apiClient';

export class AuthService {

  login(credentials) {
    return apiClient.post('/auth/login', credentials)
      .then(response => response.data);
  };

  forgetPassword(credentials){
    return apiClient.post('/auth/forget-password', credentials)
      .then(response => response.data);
  };

  forgetPassword(credentials){
    return apiClient.post('/auth/reset-password', credentials)
      .then(response => response.data);
  };
}

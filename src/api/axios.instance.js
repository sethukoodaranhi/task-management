// src/api/axiosInstance.js
import axios from 'axios';

export const createAxiosInstance = (apiUrl) => {
  const axiosInstance = axios.create({
        baseURL: apiUrl,
    });

    axiosInstance.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    return axiosInstance

}


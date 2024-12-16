import axios from 'axios';
const BASE_URL = 'http://localhost:3001';

const apiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

apiPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pszToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiPrivate;
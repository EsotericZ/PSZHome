import axios from 'axios';
const BASE_URL = 'http://localhost:3001';

const apiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default apiPrivate;
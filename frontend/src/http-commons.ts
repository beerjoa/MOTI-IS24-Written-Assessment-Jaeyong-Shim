import axios from 'axios';

const DEV_API_URL = 'http://localhost:43000';

const api = axios.create({
  baseURL: DEV_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

import axios from 'axios';

const API = axios.create({
  baseURL: 'https://lexos-backend-ek2i.onrender.com/api'
})

// Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('lexos_token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
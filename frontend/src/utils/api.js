import axios from 'axios';

const API = axios.create({
  baseURL: 'https://lexos-backend-ek2i.onrender.com/api'
});

// Attach token on every request - reads fresh from localStorage each time
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('lexos_token')
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
}, (error) => {
  return Promise.reject(error)
})

// Handle 401 globally - logout if token expired
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('lexos_token')
      localStorage.removeItem('lexos_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default API;
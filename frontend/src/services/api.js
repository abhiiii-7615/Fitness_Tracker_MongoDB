import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://fitness-tracker-p05w.onrender.com');

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`, 
});

// Adding  token to all requests (and this is checked in the middleware whether the starting )
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Exporting individual API calls to the frontend compos 
export const getBackendStatus = () => axios.get(`${API_BASE_URL}/`); // for testing only(will print backend running in port 5000)
export const registerUser = (formData) => API.post('/register', formData);//register form
export const loginUser = (formData) => API.post('/login', formData);//login form
export const getProfile = () => API.get('/profile');//fetching profile for userprofile.jsx
export const logWater = (data) => API.post('/water/log', data);//updating water log
export const logCalorie= (data) => API.post('/calorie/log',data);//updating calorie log
export const logSleep = (data) => API.post('/sleep/log', data);//updating sleep log
import axios from "axios";

export const API_URL = `http://localhost:5000/api`;
export const AUTH_URL = `http://localhost:5000/auth`;
const $api  = axios.create({
    withCredentials: true,
    baseURL:`http://localhost:5000/`
})
$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export default $api;
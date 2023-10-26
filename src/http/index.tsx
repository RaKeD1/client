import axios from "axios";

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});
const $auth = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_AUTH_URL,
});
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
export { $auth };
export default $api;

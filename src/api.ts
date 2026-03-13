import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export default api;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

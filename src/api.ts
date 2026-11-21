import axios from "axios";
import { getAuthHeader } from "./auth/token";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export default api;

api.interceptors.request.use((config) => {
  const auth = getAuthHeader();
  if (auth) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = auth;
  }
  return config;
});

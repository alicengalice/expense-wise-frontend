import axios from "axios";
import { clearToken, decodeToken, getValidToken, setToken } from "./token";

const GO_AUTH_URL = "http://localhost:8081";

const authProvider = {
  login: async ({ username, password }: { username: string; password: string }) => {
    try {
      const response = await axios.post(`${GO_AUTH_URL}/login`, { username, password });
      const { token, error } = response.data;
      if (error || !token) {
        return Promise.reject(new Error(error || "Login failed"));
      }
      setToken(token);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          return Promise.reject(
            new Error("Cannot reach auth service. Is it running on port 8081?")
          );
        }

        const status = error.response.status;
        const body = error.response.data;
        const message =
          typeof body === "string"
            ? body
            : body?.error || body?.message || `Login failed (${status})`;

        return Promise.reject(new Error(message));
      }

      return Promise.reject(new Error("Login failed"));
    }
  },

  logout: () => {
    clearToken();
    return Promise.resolve();
  },

  // Rejects (-> login page) when the token is missing or already expired,
  // instead of waiting for the first API call to fail
  checkAuth: () => {
    return getValidToken() ? Promise.resolve() : Promise.reject();
  },

  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      clearToken();
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: () => {
    const token = getValidToken();
    const payload = token ? decodeToken(token) : null;
    const name = payload?.username ?? payload?.sub;
    if (!name) return Promise.reject();
    return Promise.resolve({ id: name, fullName: name });
  },

  getPermissions: () => Promise.resolve("admin"),
};

export default authProvider;
import axios from "axios";

const GO_AUTH_URL = "http://localhost:8081";

const authProvider = {
  login: async ({ username, password }: { username: string; password: string }) => {
    try {
      const response = await axios.post(`${GO_AUTH_URL}/login`, { username, password });
      const { token, error } = response.data;
      if (error || !token) {
        return Promise.reject(new Error(error || "Login failed"));
      }
      localStorage.setItem("auth_token", token);
      return Promise.resolve();
    } catch {
      return Promise.reject(new Error("Invalid credentials"));
    }
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("auth_token") ? Promise.resolve() : Promise.reject();
  },

  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth_token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return Promise.reject();
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Promise.resolve({ id: payload.username, fullName: payload.username });
    } catch {
      return Promise.reject();
    }
  },

  getPermissions: () => Promise.resolve("admin"),
};

export default authProvider;
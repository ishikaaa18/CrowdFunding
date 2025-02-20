import axios from "axios";

const API_URL = "https://your-api-url.com/auth"; // Replace with actual backend URL

const authService = {
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },

  login: async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  }
};

// ✅ Explicitly exporting loginUser
export const loginUser = authService.login;

export default authService;


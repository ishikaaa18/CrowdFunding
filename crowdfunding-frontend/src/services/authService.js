import axios from "axios";

const API_URL = "https://your-backend.com/auth"; // Replace with actual backend URL

const authService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      throw error;
    }
  },

  login: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  }
};

// ✅ Explicitly exporting loginUser for direct imports
export const loginUser = authService.login;

export default authService;



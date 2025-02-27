import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Update if needed

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

// 🔹 Fix: Correctly Export login Function
export const loginUser = authService.login; // ✅ Named export for loginUser
export default authService; // ✅ Default export for authService



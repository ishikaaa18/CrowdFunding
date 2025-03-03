import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Update if needed

const authService = {
  // Register User
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data; // Returns user data (including token)
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      throw error; // Re-throw the error for higher-level handling
    }
  },

  // Login User
  login: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      return response.data; // Returns user data (including token)
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error; // Re-throw the error for higher-level handling
    }
  }
};

// Default export for the service
export default authService;

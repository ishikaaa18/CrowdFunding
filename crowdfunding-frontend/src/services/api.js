import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Ensure this matches your backend API

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach Authorization token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors (e.g., network issues)
    return Promise.reject(error);
  }
);

// Optionally: Add response interceptor for handling errors like 401 (unauthorized) or 500 (server errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle token expiration or unauthorized access
      console.log("Token expired or unauthorized. Please login again.");
      // Redirect to login page or handle logout
    } else if (error.response && error.response.status === 500) {
      // Handle server error
      console.error("Server error. Please try again later.");
    }
    return Promise.reject(error);
  }
);

export default api;



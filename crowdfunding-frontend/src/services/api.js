import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Ensure this matches your backend API

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Attach Authorization token automatically if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      // Only log in development mode (prevents unnecessary logs in production)
      if (process.env.NODE_ENV === "development") {
        console.log("🔹 Attached token:", token);
      }
    } else {
      console.warn("⚠ No token found in localStorage!");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor for handling API errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn("⚠ Unauthorized access! Redirecting to login...");

        // Optional: Auto logout if the token is expired
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
      } else if (status === 500) {
        console.error("❌ Server error! Please try again later.");
      }
    } else {
      console.error("❌ Network error! Check your connection.");
    }

    return Promise.reject(error);
  }
);

export default api;




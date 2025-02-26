import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api"; 

// Create Axios instance with base URL & credentials enabled
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensures cookies are sent if authentication is needed
});

// Fetch Projects
export const fetchProjects = async () => {
  try {
    const response = await api.get("/projects");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching projects:", error.response?.data || error.message);
    throw error;
  }
};

console.log("Backend URL:", API_URL);

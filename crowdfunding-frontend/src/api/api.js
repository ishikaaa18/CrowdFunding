import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Backend base URL

// ✅ Register User (Fixed API Path)
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, userData, {
      headers: { "Content-Type": "multipart/form-data" }, // Required for file uploads
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Login User (Fixed API Path & Removed Wrong Content-Type)
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch All Campaigns
export const fetchCampaigns = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/campaigns`);
    return response.data;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
};

// ✅ Fetch Featured Campaigns
export const fetchFeaturedCampaigns = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/campaigns/featured`);
    return response.data;
  } catch (error) {
    console.error("Error fetching featured campaigns:", error);
    return [];
  }
};

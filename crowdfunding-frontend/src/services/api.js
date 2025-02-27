import axios from "axios";

// Set up API base URL from environment variables or default to localhost
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensures cookies are sent if authentication is needed
});

// ✅ Fetch All Campaigns
export const getAllCampaigns = async () => {
  try {
    const response = await api.get("/campaigns");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching campaigns:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch All Projects
export const fetchProjects = async () => {
  try {
    const response = await api.get("/projects");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching projects:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch a Single Campaign by ID
export const getCampaignById = async (campaignId) => {
  try {
    const response = await api.get(`/campaigns/${campaignId}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching campaign ${campaignId}:`, error.response?.data || error.message);
    throw error;
  }
};

// ✅ Create a New Campaign
export const createCampaign = async (campaignData) => {
  try {
    const response = await api.post("/campaigns", campaignData);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating campaign:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update an Existing Campaign
export const updateCampaign = async (campaignId, campaignData) => {
  try {
    const response = await api.put(`/campaigns/${campaignId}`, campaignData);
    return response.data;
  } catch (error) {
    console.error(`❌ Error updating campaign ${campaignId}:`, error.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete a Campaign
export const deleteCampaign = async (campaignId) => {
  try {
    const response = await api.delete(`/campaigns/${campaignId}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error deleting campaign ${campaignId}:`, error.response?.data || error.message);
    throw error;
  }
};

console.log("Backend URL:", API_URL);


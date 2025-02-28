import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/campaigns"; // Adjust if needed

// Fetch all campaigns
export const getAllCampaigns = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching campaigns:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new campaign
export const createCampaign = async (campaignData) => {
  try {
    const response = await axios.post(API_BASE_URL, campaignData);
    return response.data;
  } catch (error) {
    console.error("Error creating campaign:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch single campaign by ID
export const getCampaignById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching campaign details:", error.response?.data || error.message);
    throw error;
  }
};

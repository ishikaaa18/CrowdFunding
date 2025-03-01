import api from "./api"; // Import axios instance from api.js

const CAMPAIGN_URL = "/campaigns"; // Base endpoint for campaigns

// Fetch all campaigns
export const getAllCampaigns = async () => {
  try {
    const response = await api.get(CAMPAIGN_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching campaigns:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new campaign (Ensuring Auth Token)
export const createCampaign = async (campaignData) => {
  try {
    const response = await api.post(CAMPAIGN_URL, campaignData);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating campaign:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch single campaign by ID
export const getCampaignById = async (id) => {
  try {
    const response = await api.get(`${CAMPAIGN_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching campaign details:", error.response?.data || error.message);
    throw error;
  }
};



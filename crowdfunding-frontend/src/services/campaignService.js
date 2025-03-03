import api from "./api"; // Import axios instance from api.js

const CAMPAIGN_URL = "/campaigns"; // Base endpoint for campaigns

// ✅ Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Fetch token from localStorage
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Create a new campaign (Fixed)
export const createCampaign = async (campaignData) => {
  try {
    const response = await api.post(CAMPAIGN_URL, campaignData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data", // Required for file uploads
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error creating campaign:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch all campaigns
export const getAllCampaigns = async () => {
  try {
    const response = await api.get(CAMPAIGN_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching campaigns:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch single campaign by ID
export const getCampaignById = async (id) => {
  try {
    const response = await api.get(`${CAMPAIGN_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching campaign details:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete a campaign by ID
export const deleteCampaign = async (id) => {
  try {
    const response = await api.delete(`${CAMPAIGN_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting campaign:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update campaign by ID
export const updateCampaign = async (id, campaignData) => {
  try {
    const response = await api.put(`${CAMPAIGN_URL}/${id}`, campaignData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error updating campaign:", error.response?.data || error.message);
    throw error;
  }
};



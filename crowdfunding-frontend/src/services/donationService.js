import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/donations";

/**
 * Make a donation to a project.
 * @param {Object} donationData - { projectId, donorName, amount, paymentMethod }
 * @returns {Promise<Object>} - Response from the backend
 */
export const donateToProject = async (donationData) => {
  try {
    const response = await axios.post(`${API_URL}/donate`, donationData);
    return response.data;
  } catch (error) {
    console.error("Donation failed:", error.response?.data || error.message);
    // Log full error object for debugging
    if (error.response) {
      console.error("Full error response:", error.response);
    }
    throw error;
  }
};

/**
 * Fetch all donations for a specific project.
 * @param {string} projectId - ID of the project
 * @returns {Promise<Array>} - List of donations
 */
export const fetchDonationsByProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching donations:", error.response?.data || error.message);
    // Log full error object for debugging
    if (error.response) {
      console.error("Full error response:", error.response);
    }
    throw error;
  }
};

/**
 * Get donation details by donation ID.
 * @param {string} donationId - ID of the donation
 * @returns {Promise<Object>} - Donation details
 */
export const getDonationDetails = async (donationId) => {
  try {
    const response = await axios.get(`${API_URL}/${donationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching donation details:", error.response?.data || error.message);
    // Log full error object for debugging
    if (error.response) {
      console.error("Full error response:", error.response);
    }
    throw error;
  }
};


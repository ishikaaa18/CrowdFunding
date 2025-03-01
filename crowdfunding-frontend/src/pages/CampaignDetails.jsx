import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const CampaignDetails = () => {
  const { id } = useParams(); // Get campaign ID from URL params
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch campaign details from the database
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/campaigns/${id}`); // Adjust API endpoint if needed
        setCampaign(response.data);
      } catch (err) {
        setError("Failed to load campaign details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();

    // Optional: Refetch data every 30 seconds for live updates
    const interval = setInterval(fetchCampaign, 30000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) return <p className="loading-text">Loading campaign details...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!campaign) return <p className="error-text">Campaign not found.</p>;

  // Handle Donate Now button click
  const handleDonateNow = () => {
    navigate(`/donate/${id}`); // Navigate to the donate page with campaign ID
  };

  return (
    <div className="campaign-details">
      <h1 className="campaign-title">{campaign.title || "Untitled Campaign"}</h1>

      <img
        src={`http://localhost:5000/${campaign.image || "placeholder.jpg"}`} // Fix image URL
        alt={campaign.title || "Campaign Image"}
        className="campaign-image"
      />

      <p><strong>Description:</strong> {campaign.description || "No description available."}</p>
      <p><strong>Goal:</strong> ${campaign.goalAmount?.toLocaleString() || "0"}</p>
      <p><strong>Raised:</strong> ${campaign.raisedAmount?.toLocaleString() || "0"}</p>
      <p><strong>Deadline:</strong> {campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : "N/A"}</p>

      <button className="donate-button" onClick={handleDonateNow}>Donate Now</button>
    </div>
  );
};

export default CampaignDetails;








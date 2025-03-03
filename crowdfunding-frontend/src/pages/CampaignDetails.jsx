import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCampaignById } from "../services/campaignService"; // Use service for API calls

const API_BASE_URL = "http://localhost:5000"; // Adjust this based on deployment

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const data = await getCampaignById(id);
        setCampaign(data);
      } catch (err) {
        setError("Failed to load campaign details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();

    // Auto-refresh campaign details every 30 seconds
    const interval = setInterval(fetchCampaign, 30000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) return <p className="loading-text">Loading campaign details...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!campaign) return <p className="error-text">Campaign not found.</p>;

  const handleDonateNow = () => {
    navigate(`/donate/${id}`);
  };

  // ✅ Fix image URL - Ensure backend serves it correctly
  const imageUrl = campaign.image
    ? `${API_BASE_URL}/${campaign.image.replace(/\\/g, "/")}` // Normalize path for cross-platform compatibility
    : "/placeholder.jpg"; // Default placeholder image

  return (
    <div className="campaign-details">
      <h1 className="campaign-title">{campaign.title || "Untitled Campaign"}</h1>

      <img
        src={imageUrl}
        alt={campaign.title || "Campaign Image"}
        className="campaign-image"
        onError={(e) => (e.target.src = "/placeholder.jpg")} // Fallback for broken images
      />

      <p><strong>Description:</strong> {campaign.description || "No description available."}</p>
      <p><strong>Goal:</strong> ₹{campaign.goalAmount?.toLocaleString() || "0"}</p>
      <p><strong>Raised:</strong> ₹{campaign.raisedAmount?.toLocaleString() || "0"}</p>
      <p><strong>Deadline:</strong> {campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : "N/A"}</p>

      <button className="donate-button" onClick={handleDonateNow}>Donate Now</button>
    </div>
  );
};

export default CampaignDetails;

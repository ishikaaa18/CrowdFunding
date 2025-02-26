import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCampaignById } from "../services/campaignService"; // Import API service
import ChatBox from "../components/common/ChatBox";
import Payment from "../components/common/Payment";
import "../styles/CampaignDetails.css";

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCampaignById(id)
      .then((data) => {
        setCampaign(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching campaign:", error);
        setError("Failed to load campaign details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="campaign-container">
      <div className="campaign-header">
        <h2>{campaign.title}</h2>
        <p className="campaign-description">{campaign.description}</p>
      </div>

      <div className="campaign-stats">
        <h4>🎯 Goal: <span>${campaign.goalAmount.toLocaleString()}</span></h4>
        <h4>💰 Raised: <span>${campaign.raisedAmount.toLocaleString()}</span></h4>
      </div>

      <div className="campaign-section">
        <h3>Make a Contribution</h3>
        <Payment campaignId={campaign._id} />
      </div>

      <div className="campaign-section">
        <h3>Join the Conversation</h3>
        <ChatBox campaignId={campaign._id} user="User123" />
      </div>
    </div>
  );
};

export default CampaignDetails;



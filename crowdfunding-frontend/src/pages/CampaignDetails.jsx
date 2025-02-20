import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChatBox from "../components/common/ChatBox";
import Payment from "../components/common/Payment";
import "../styles/CampaignDetails.css"; // Import CSS for styling

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/campaigns/${id}`)
      .then((response) => {
        setCampaign(response.data);
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
      {/* Campaign Details */}
      <div className="campaign-header">
        <h2>{campaign.title}</h2>
        <p className="campaign-description">{campaign.description}</p>
      </div>

      {/* Campaign Stats */}
      <div className="campaign-stats">
        <h4>🎯 Goal: <span>${campaign.goalAmount.toLocaleString()}</span></h4>
        <h4>💰 Raised: <span>${campaign.raisedAmount.toLocaleString()}</span></h4>
      </div>

      {/* Payment Section */}
      <div className="campaign-section">
        <h3>Make a Contribution</h3>
        <Payment campaignId={campaign._id} />
      </div>

      {/* Chat Section */}
      <div className="campaign-section">
        <h3>Join the Conversation</h3>
        <ChatBox campaignId={campaign._id} user="User123" />
      </div>
    </div>
  );
};

export default CampaignDetails;


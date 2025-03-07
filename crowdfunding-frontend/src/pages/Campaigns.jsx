import React, { useEffect, useState } from "react";
import { fetchCampaigns } from "../api/api";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Campaigns.css";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCampaigns = async () => {
      const data = await fetchCampaigns();
      setCampaigns(data);
    };
    getCampaigns();
  }, []);

  const handleDonateClick = (campaignId) => {
    navigate(`/donate/${campaignId}`); // Redirect to donate page for specific campaign
  };

  return (
    <div className="campaigns-container">
      <h2>Explore Campaigns</h2>
      <div className="campaigns-list">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="campaign-card">
            {campaign.image && <img src={`http://localhost:5000/${campaign.image}`} alt={campaign.title} />}
            <h3>{campaign.title}</h3>
            <p>{campaign.description}</p>
            <p><strong>Goal:</strong> ₹{campaign.goalAmount}</p>
            <p><strong>Raised:</strong> ₹{campaign.raisedAmount}</p>
            <button className="donate-btn" onClick={() => handleDonateClick(campaign._id)}>
              Donate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;

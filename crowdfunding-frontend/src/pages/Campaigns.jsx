import React, { useEffect, useState } from "react";
import { fetchCampaigns } from "../api/api";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Campaigns.css";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    const getCampaigns = async () => {
      const data = await fetchCampaigns();
      setCampaigns(data);
    };
    getCampaigns();
  }, []);

  // Filter campaigns based on the search query
  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDonateClick = (campaignId) => {
    navigate(`/donate/${campaignId}`); // Redirect to donate page for specific campaign
  };

  return (
    <div className="campaigns-container">
      <h2>Explore Campaigns</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search campaigns..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="campaigns-list">
        {filteredCampaigns.map((campaign) => (
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

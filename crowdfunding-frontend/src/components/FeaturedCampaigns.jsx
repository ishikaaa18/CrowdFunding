import React, { useEffect, useState } from "react";
import { fetchFeaturedCampaigns } from "../api/api"; // Corrected import
import { Link } from "react-router-dom";
import "../assets/styles/FeaturedCampaigns.css"; // Import CSS file

const FeaturedCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const getCampaigns = async () => {
      const data = await fetchFeaturedCampaigns();
      setCampaigns(data);
    };

    getCampaigns();
  }, []);

  return (
    <section className="featured-campaigns">
      <h2>Featured Campaigns</h2>
      <div className="campaign-list">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div key={campaign._id} className="campaign-card">
              {campaign.image && (
                <img
                  src={`http://localhost:5000/${campaign.image}`}
                  alt={campaign.title}
                />
              )}
              <h3>{campaign.title}</h3>
              <p>{campaign.description.substring(0, 100)}...</p>
              <Link to={`/campaigns/${campaign._id}`} className="details-button">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No featured campaigns available.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedCampaigns;

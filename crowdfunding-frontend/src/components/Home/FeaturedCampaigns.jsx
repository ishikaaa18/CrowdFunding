import React from "react";
import "../../styles/FeaturedCampaigns.css";

// Import images properly
import campaign1 from "../../assets/images/campaign1.jpg";
import campaign2 from "../../assets/images/campaign2.jpg";
import campaign3 from "../../assets/images/campaign3.webp";

const campaigns = [
  {
    id: 1,
    title: "Help Build a School for Underprivileged Children",
    image: campaign1,  // Use imported images
    raised: 7500,
    goal: 10000,
  },
  {
    id: 2,
    title: "Support Cancer Treatment for John Doe",
    image: campaign2,
    raised: 12000,
    goal: 15000,
  },
  {
    id: 3,
    title: "Provide Clean Water to Rural Villages",
    image: campaign3,
    raised: 5000,
    goal: 8000,
  },
];

const FeaturedCampaigns = () => {
  return (
    <section className="featured-campaigns">
      <h2>Featured Campaigns</h2>
      <div className="campaigns-container">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-card">
            <img src={campaign.image} alt={campaign.title} className="campaign-image" />
            <h3>{campaign.title}</h3>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
              ></div>
            </div>
            <p>
              Raised: <strong>${campaign.raised.toLocaleString()}</strong> / Goal: <strong>${campaign.goal.toLocaleString()}</strong>
            </p>
            <button className="donate-btn">Donate Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCampaigns;


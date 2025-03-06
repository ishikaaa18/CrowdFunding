import React from "react";
import "../assets/styles/Campaigns.css";

const campaignsData = [
  {
    id: 1,
    title: "Save the Rainforest",
    description: "Help us protect the rainforest by funding reforestation efforts.",
    goal: "$50,000",
    raised: "$30,000",
  },
  {
    id: 2,
    title: "Education for All",
    description: "Providing education to underprivileged children around the world.",
    goal: "$100,000",
    raised: "$75,000",
  },
  {
    id: 3,
    title: "Clean Water Initiative",
    description: "Bringing clean water to communities in need.",
    goal: "$80,000",
    raised: "$40,000",
  },
];

const Campaigns = () => {
  return (
    <div className="campaigns-container">
      <h2>Explore Campaigns</h2>
      <div className="campaigns-list">
        {campaignsData.map((campaign) => (
          <div key={campaign.id} className="campaign-card">
            <h3>{campaign.title}</h3>
            <p>{campaign.description}</p>
            <p><strong>Goal:</strong> {campaign.goal}</p>
            <p><strong>Raised:</strong> {campaign.raised}</p>
            <button className="donate-btn">Donate</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;

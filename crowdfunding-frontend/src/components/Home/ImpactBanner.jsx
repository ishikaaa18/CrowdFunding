import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import heroBackground from "../../assets/images/global-reach.jpeg"; // Import the image
import "../../styles/ImpactBanner.css"; 

const ImpactBanner = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleStartCampaign = () => {
    if (user) {
      navigate("/start-project"); // Redirect to StartProject page
    } else {
      navigate("/register"); // Redirect to Register page if not logged in
    }
  };

  return (
    <div className="impact-banner" style={{ backgroundImage: `url(${heroBackground})` }}>
      <div className="impact-content">
        <h1>Empower Dreams, Fund the Future</h1>
        <p>Join our crowdfunding community and turn ideas into reality.</p>
        <div className="impact-buttons">
          <button onClick={handleStartCampaign} className="btn primary-btn">
            Start a Campaign
          </button>
          <button onClick={() => navigate("/campaigns")} className="btn secondary-btn">
            Explore Campaigns
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImpactBanner;


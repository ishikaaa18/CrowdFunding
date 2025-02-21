import React from "react";
import { Link } from "react-router-dom";
import heroBackground from "../../assets/images/global-reach.jpeg"; // Import the image
import "../../styles/ImpactBanner.css"; 

const ImpactBanner = () => {
  return (
    <div className="impact-banner" style={{ backgroundImage: `url(${heroBackground})` }}>
      <div className="impact-content">
        <h1>Empower Dreams, Fund the Future</h1>
        <p>Join our crowdfunding community and turn ideas into reality.</p>
        <div className="impact-buttons">
          <Link to="/startProject" className="btn primary-btn">Start a Campaign</Link>
          <Link to="/campaigns" className="btn secondary-btn">Explore Campaigns</Link>
        </div>
      </div>
    </div>
  );
};

export default ImpactBanner;

import React from "react";
import { Link } from "react-router-dom";
import "../../styles/ImpactBanner.css";

const ImpactBanner = () => {
  return (
    <div className="impact-banner">
      <div className="impact-content">
        <h1>Empower Dreams, Fund the Future</h1>
        <p>Join our crowdfunding community and turn ideas into reality.</p>
        <div className="impact-buttons">
          <Link to="/start-project" className="btn primary-btn">Start a Campaign</Link>
          <Link to="/campaigns" className="btn secondary-btn">Explore Campaigns</Link>
        </div>
      </div>
    </div>
  );
};

export default ImpactBanner;

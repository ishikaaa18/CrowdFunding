import React from "react";
import "../../styles/HowItWorks.css";
import { FaLightbulb, FaBullhorn, FaHandHoldingUsd } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps-container">
        <div className="step">
          <FaLightbulb className="step-icon" />
          <h3>Start a Campaign</h3>
          <p>Sign up and create a campaign for your cause in just a few minutes.</p>
        </div>

        <div className="step">
          <FaBullhorn className="step-icon" />
          <h3>Share Your Story</h3>
          <p>Promote your campaign through social media and reach potential donors.</p>
        </div>

        <div className="step">
          <FaHandHoldingUsd className="step-icon" />
          <h3>Receive Donations</h3>
          <p>Securely collect funds and make a difference with your campaign.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

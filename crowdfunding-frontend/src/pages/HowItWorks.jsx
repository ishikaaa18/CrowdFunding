import React from "react";
import "../styles/HowItWorks.css";

const HowItWorks = () => {
  return (
    <div className="how-it-works-container">
      <h1 className="how-it-works-header">🚀 How It Works</h1>
      <p className="how-it-works-subtext">
        Raising funds has never been easier! Follow these simple steps to launch your campaign and make an impact.
      </p>

      <div className="steps-container">
        {/* Step 1 */}
        <div className="step">
          <div className="step-icon">📝</div>
          <h2 className="step-title">1. Create Your Campaign</h2>
          <p className="step-text">
            Sign up and set up your campaign with a compelling story, images, videos, and funding goals.
          </p>
        </div>

        {/* Step 2 */}
        <div className="step">
          <div className="step-icon">📢</div>
          <h2 className="step-title">2. Share with the World</h2>
          <p className="step-text">
            Spread the word via social media, email, and personal networks to attract supporters.
          </p>
        </div>

        {/* Step 3 */}
        <div className="step">
          <div className="step-icon">💳</div>
          <h2 className="step-title">3. Receive Donations</h2>
          <p className="step-text">
            Supporters can donate easily using secure payment options, and you can track contributions in real-time.
          </p>
        </div>

        {/* Step 4 */}
        <div className="step">
          <div className="step-icon">🎉</div>
          <h2 className="step-title">4. Reach Your Goal</h2>
          <p className="step-text">
            Once your goal is met, receive the funds securely and start making an impact!
          </p>
        </div>
      </div>

      <p className="final-message">
        Ready to bring your idea to life? <a href="/register" className="start-link">Start Your Campaign Now!</a>
      </p>
    </div>
  );
};

export default HowItWorks;

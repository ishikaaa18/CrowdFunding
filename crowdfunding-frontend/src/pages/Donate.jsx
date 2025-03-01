import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Donate.css"; // Ensure styling
import paymentImage from "../assets/images/credit-card.png"; // Replace with actual image

const Donate = () => {
  const [amount, setAmount] = useState("");

  const handleDonate = (e) => {
    e.preventDefault();
    // Implement donation API call here
    alert(`Thank you for donating ₹${amount}!`);
  };

  return (
    <div className="donation-container">
      <h1 className="donation-heading">Make a Difference with Your Donation</h1>

      <p>
        Your contribution helps us create meaningful change. Every rupee counts!
      </p>

      {/* Donation Progress */}
      <div className="donation-progress">
        <div className="progress-bar" style={{ width: "70%" }}></div>
      </div>
      <p>
        <strong>₹70,000</strong> raised out of ₹1,00,000 goal
      </p>

      {/* Donation Form */}
      <form className="donation-form" onSubmit={handleDonate}>
        <label>Enter Donation Amount (₹):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Donate Now</button>
      </form>

      {/* Payment Methods */}
      <div className="payment-section">
        <h3>We Accept</h3>
        <img src={paymentImage} alt="Payment Methods" />
      </div>

      {/* Additional Information */}
      <div className="donation-info">
        <h3>Why Donate?</h3>
        <p>
          Your donation supports education, healthcare, and community
          development.
        </p>

        <h3>Where Does Your Money Go?</h3>
        <p>
          80% goes directly to community projects, 15% for operational costs, 5%
          for outreach.
        </p>

        <h3>Need Help?</h3>
        <p>
          Contact our support team at{" "}
          <a href="mailto:support@crowdfund.com">support@crowdfund.com</a>
        </p>
      </div>

      {/* Social Sharing */}
      <div className="social-sharing">
        <h3>Spread the Word</h3>
        <Link to="/">Share on Facebook</Link> |{" "}
        <Link to="/">Share on Twitter</Link>
      </div>
    </div>
  );
};

export default Donate;

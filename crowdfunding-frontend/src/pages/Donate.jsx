import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Donate.css";
import paymentImage from "../assets/images/credit-card.png";

const Donate = () => {
  const { campaignId } = useParams(); // Retrieve campaign ID from the URL
  const [amount, setAmount] = useState("");
  const [donationStatus, setDonationStatus] = useState(""); // To track donation status (success/error)
  const [campaign, setCampaign] = useState(null); // Store campaign details
  const [error, setError] = useState(""); // To store any error message while fetching campaign details

  // Fetch campaign details using the campaignId
  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaigns/${campaignId}`);
        setCampaign(response.data);
      } catch (error) {
        setError("Failed to fetch campaign details. Please try again later.");
        console.error("Error fetching campaign details:", error.response?.data || error.message);
      }
    };

    fetchCampaignDetails();
  }, [campaignId]);

  const handleDonate = async (e) => {
    e.preventDefault();

    if (amount <= 0 || isNaN(amount)) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      // Get the token from localStorage (you may have stored the token when the user logged in)
      const token = localStorage.getItem("token");

      // Make sure we have a token
      if (!token) {
        alert("You need to be logged in to donate.");
        return;
      }

      // Implement API call to make the donation with Authorization header
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/donations`,
        {
          amount,
          campaignId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );

      setDonationStatus("success");
      alert(`Thank you for donating ₹${amount}!`);
    } catch (error) {
      setDonationStatus("error");
      alert("Something went wrong. Please try again.");
    }
  };

  const progressWidth = (raised, goal) => (raised / goal) * 100;

  return (
    <div className="donation-container">
      {campaign ? (
        <>
          <h1 className="donation-heading">Donate to {campaign.title}</h1>
          <p>{campaign.description}</p>

          {/* Donation Progress */}
          <div className="donation-progress">
            <div
              className="progress-bar"
              style={{
                width: `${progressWidth(campaign.raisedAmount, campaign.goalAmount)}%`,
              }}
            ></div>
          </div>
          <p>
            <strong>₹{campaign.raisedAmount.toLocaleString()}</strong> raised out of ₹
            {campaign.goalAmount.toLocaleString()} goal
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
            <p>Your donation supports education, healthcare, and community development.</p>

            <h3>Where Does Your Money Go?</h3>
            <p>
              80% goes directly to community projects, 15% for operational costs, 5% for outreach.
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

          {/* Donation Status */}
          {donationStatus === "success" && <p className="success-message">Donation successful! Thank you.</p>}
          {donationStatus === "error" && <p className="error-message">Something went wrong. Please try again.</p>}
        </>
      ) : (
        <p>{error || "Loading campaign details..."}</p>
      )}
    </div>
  );
};

export default Donate;

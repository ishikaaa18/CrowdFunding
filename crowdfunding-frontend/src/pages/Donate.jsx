import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/styles/Donate.css"; // Custom styles for donation form

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { campaignId } = useParams(); // Get campaignId from URL params
  const navigate = useNavigate();

  const handleDonate = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    setLoading(true);
    setError(null);

    // Get user token from localStorage
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : "";

    try {
      const response = await axios.post(
        "http://localhost:5000/api/donations", // Back-end endpoint
        { campaignId, amount, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Success: Redirect to dashboard after donation
      if (response.status === 201) {
        alert("Donation successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Donation failed:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="donate-container">
      <h2>Donate to Campaign</h2>
      <form onSubmit={handleDonate}>
        <div>
          <label>Donation Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
            step="any"
            placeholder="Enter donation amount"
          />
        </div>
        <div>
          <label>Message (Optional)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message with your donation"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Donate Now"}
        </button>
      </form>
    </div>
  );
};

export default Donate;

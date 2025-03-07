import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/styles/Donate.css"; // Custom styles for donation form

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

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
      // Step 1: Create a donation in the backend (without the payment)
      const response = await axios.post(
        "http://localhost:5000/api/donations", // Back-end endpoint
        { campaignId, amount, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Step 2: Check if the donation creation was successful
      if (response.status === 201) {
        const donation = response.data;

        // Step 3: Integrate with the payment gateway (Here using Razorpay for example)
        openPaymentGateway(donation);
      }
    } catch (error) {
      console.error("Donation failed:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openPaymentGateway = (donation) => {
    // Example using Razorpay (you can change this to PhonePe or other payment gateway)
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key
      amount: amount * 100, // Convert amount to paise (for Razorpay)
      currency: "INR",
      name: "Crowdfunding Platform",
      description: "Donation for Campaign",
      image: "/logo.png", // Optional logo
      order_id: donation._id, // You can use your backend order ID here
      handler: async function (response) {
        // Step 4: Once payment is successful, verify payment with backend
        try {
          const verifyResponse = await axios.post(
            "http://localhost:5000/api/donations/verify", // Backend payment verification route
            {
              paymentReference: response.razorpay_payment_id,
              donationId: donation._id,
              paymentStatus: "success",
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("user")}`,
              },
            }
          );

          if (verifyResponse.status === 200) {
            alert("Payment verified successfully!");
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Payment verification failed:", error);
          alert("Payment verification failed. Please try again.");
        }
      },
      prefill: {
        name: "Donor Name", // You can fetch the user's name dynamically
        email: "donor@example.com", // You can fetch the user's email dynamically
      },
      notes: {
        campaignId,
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
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

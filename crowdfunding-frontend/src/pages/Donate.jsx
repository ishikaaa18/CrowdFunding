import { useState } from "react";
import "../styles/Donate.css"; // Import styles

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !email || (!name && !isAnonymous)) {
      alert("Please provide all required details.");
      return;
    }

    const donorName = isAnonymous ? "Anonymous Donor" : name;
    alert(`Thank you, ${donorName}, for donating ₹${amount} via ${paymentMethod}!`);

    // Here, integrate a payment API (e.g., Razorpay, Stripe, PayPal)
  };

  return (
    <div className="donate-container">
      <h2>Make a Donation</h2>
      <form onSubmit={handleSubmit}>
        <label>Donation Amount (₹):</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {!isAnonymous && (
          <>
            <label>Your Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isAnonymous}
            />
          </>
        )}

        <div className="checkbox-container">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
          />
          <label htmlFor="anonymous">Donate Anonymously</label>
        </div>

        <label>Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="UPI">UPI</option>
          <option value="Credit/Debit Card">Credit/Debit Card</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Wallet">Wallet</option>
        </select>

        <label>Message (Optional):</label>
        <textarea
          placeholder="Leave a message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button type="submit">Donate Now</button>
      </form>
    </div>
  );
};

export default Donate;

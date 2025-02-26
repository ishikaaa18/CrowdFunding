import React, { useState } from "react";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFakePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      alert("Payment Successful! (Simulated)");
    }, 2000); // Simulates payment delay
  };

  return (
    <div>
      <h2>Donate Now</h2>
      {!success ? (
        <button onClick={handleFakePayment} disabled={loading}>
          {loading ? "Processing..." : "Pay ₹100 (Demo)"}
        </button>
      ) : (
        <p>✅ Payment Completed Successfully!</p>
      )}
    </div>
  );
};

export default Payment;

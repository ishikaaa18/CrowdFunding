import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const DonateForm = ({ campaignId, amount }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleDonate = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Call your backend to create a payment intent
      const { data } = await axios.post('http://localhost:5000/api/create-payment-intent', {
        amount, // Amount in cents
        campaignId, // Add campaignId for backend processing
      });

      const { clientSecret } = data;

      // Step 2: Confirm payment with the card details from the form
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.error(error);
        alert('Payment failed');
      } else if (paymentIntent.status === 'succeeded') {
        // Step 3: Payment was successful, update the database
        await axios.post('http://localhost:5000/api/donations', {
          campaignId,
          amount,
          paymentId: paymentIntent.id,
        });
        alert('Donation successful!');
      }
    } catch (error) {
      console.error('Error during payment:', error);
      alert('An error occurred while processing the payment');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleDonate}>
      <CardElement />
      <button type="submit" disabled={isProcessing || !stripe}>Donate {amount}</button>
    </form>
  );
};

export default DonateForm;

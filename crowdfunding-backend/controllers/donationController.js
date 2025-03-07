const stripe = require("stripe")("YOUR_SECRET_KEY"); // Replace with your Stripe secret key
const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");
const mongoose = require("mongoose"); // Use mongoose for transactions

// ✅ Create a payment intent for donation
const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    // Create payment intent with amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to smallest currency unit (e.g., paise for INR)
      currency: "inr", // Set currency, change as per your need
      description: "Donation Payment",
    });

    // Return client secret to frontend
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ message: "Server error creating payment intent" });
  }
};

// ✅ Verify payment and store donation in DB
const verifyPayment = async (req, res) => {
  const { campaignId, amount, message, paymentIntentId } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Verify the payment with the payment gateway
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "Payment failed" });
    }

    // Ensure campaign exists
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Create a new donation
    const donorId = req.user._id;
    const donation = new Donation({
      campaignId,
      donorId,
      amount,
      message,
      paymentStatus: paymentIntent.status,
      paymentId: paymentIntent.id,
    });

    await donation.save({ session });

    // Update the campaign's raisedAmount
    campaign.raisedAmount += amount;
    await campaign.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Respond with the donation details
    res.status(201).json({ success: true, donation });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Server error verifying payment" });
  }
};

module.exports = { createPaymentIntent, verifyPayment };

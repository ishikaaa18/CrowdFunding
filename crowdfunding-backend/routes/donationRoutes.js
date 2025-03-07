const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Campaign = require('../models/Campaign');
const Donation = require('../models/Donation');
const User = require('../models/User');

const router = express.Router();

// Create a donation
router.post('/', protect, async (req, res) => {
  try {
    const { campaignId, amount, message, paymentReference } = req.body; // Add paymentReference here
    const donorId = req.user._id;

    // Ensure campaign exists
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Create donation record
    const donation = await Donation.create({
      campaignId,
      donorId,
      amount,
      message,
      paymentReference,  // Store the payment reference or transaction ID
      paymentStatus: 'Pending'  // Add payment status
    });

    // Update User Model: Push the donation to the user's donations array
    await User.findByIdAndUpdate(
      donorId,
      { $push: { donations: donation._id } },
      { new: true }
    );

    // Update Campaign Model: Increase raisedAmount
    campaign.raisedAmount += amount;
    await campaign.save();

    res.status(201).json(donation);
  } catch (error) {
    console.error("Error processing donation:", error);
    res.status(500).json({ message: "Failed to process donation" });
  }
});

// Payment verification endpoint (to be called after payment confirmation from the frontend)
router.post('/verify', protect, async (req, res) => {
  const { paymentReference, donationId, paymentStatus } = req.body;

  try {
    // Find the donation by ID
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Update donation status after payment verification
    donation.paymentStatus = paymentStatus;  // Update payment status
    donation.paymentReference = paymentReference;  // Store payment reference

    await donation.save();

    // Optionally update the campaign's raisedAmount again if needed
    const campaign = await Campaign.findById(donation.campaignId);
    if (campaign) {
      campaign.raisedAmount += donation.amount; // Ensure campaign raisedAmount is accurate
      await campaign.save();
    }

    res.status(200).json({ message: 'Payment verified successfully' });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Failed to verify payment" });
  }
});

module.exports = router;

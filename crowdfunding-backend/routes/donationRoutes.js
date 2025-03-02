const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Campaign = require('../models/Campaign');
const Donation = require('../models/Donation');
const User = require('../models/User');

const router = express.Router();

// Create a donation
router.post('/', protect, async (req, res) => {
  try {
    const { campaignId, amount, message } = req.body;
    const donorId = req.user._id;

    // Ensure campaign exists
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Create donation
    const donation = await Donation.create({
      campaignId,
      donorId,
      amount,
      message
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

module.exports = router;



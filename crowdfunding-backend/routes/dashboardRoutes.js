const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Campaign = require('../models/Campaign');
const Donation = require('../models/Donation');

const router = express.Router();

// Get user-specific campaigns and donations
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get campaigns created by the user
    const createdCampaigns = await Campaign.find({ creator: userId });

    // Get donations made by the user and populate campaign details
    const donations = await Donation.find({ donorId: userId })
      .populate('campaignId', 'title raisedAmount goalAmount');

    res.status(200).json({
      createdCampaigns,
      donations,
    });
  } catch (error) {
    console.error("❌ Error fetching dashboard data:", error);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
});

module.exports = router;


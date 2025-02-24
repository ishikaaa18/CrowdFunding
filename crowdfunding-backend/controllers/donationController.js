const Donation = require('../models/Donation');
const Project = require('../models/Project');

// @desc    Make a donation
// @route   POST /api/donations
// @access  Private
const makeDonation = async (req, res) => {
  try {
    const { campaignId, amount, message } = req.body;
    const donorId = req.user.id; // Extract donor from auth middleware

    // Check if project exists
    const project = await Project.findById(campaignId);
    if (!project) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Create a new donation
    const donation = new Donation({
      campaignId,
      donorId,
      amount,
      message,
    });

    await donation.save();

    // Update project's collected amount
    project.raisedAmount += amount;
    await project.save();

    res.status(201).json({ message: 'Donation successful', donation });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Get donations for a specific campaign
// @route   GET /api/donations/:campaignId
// @access  Public
const getCampaignDonations = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const donations = await Donation.find({ campaignId }).populate('donorId', 'name email');

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { makeDonation, getCampaignDonations };

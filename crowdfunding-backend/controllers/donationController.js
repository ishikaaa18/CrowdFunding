const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");

// ✅ Make a donation
const makeDonation = async (req, res) => {
  try {
    const { campaignId, amount, message } = req.body;
    const donorId = req.user._id; // ✅ Extract donor ID correctly

    // Check if campaign exists
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Create a new donation
    const donation = new Donation({
      campaignId,
      donorId,
      amount,
      message,
    });

    await donation.save();

    // Update campaign's collected amount
    campaign.raisedAmount += amount;
    await campaign.save();

    res.status(201).json({ message: "Donation successful", donation });
  } catch (error) {
    console.error("❌ Error making donation:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get donations for a specific campaign
const getCampaignDonations = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const donations = await Donation.find({ campaignId }).populate("donorId", "name email");

    res.status(200).json(donations);
  } catch (error) {
    console.error("❌ Error fetching donations:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { makeDonation, getCampaignDonations };

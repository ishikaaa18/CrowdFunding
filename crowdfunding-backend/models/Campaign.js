const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    goalAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", CampaignSchema);
const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");

const donateToCampaign = async (req, res) => {
  const { campaignId, amount, message } = req.body;
  const donorId = req.user._id;  // Assuming you're using JWT for user authentication

  try {
    // Create a new donation
    const donation = new Donation({
      campaignId,
      donorId,
      amount,
      message,
    });

    await donation.save();

    // Update the campaign's raised amount
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    campaign.raisedAmount += amount;  // Increment the raised amount
    await campaign.save();

    return res.status(200).json({
      message: "Donation successful",
      donation,
      updatedCampaign: campaign,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to process donation" });
  }
};

module.exports = { donateToCampaign };


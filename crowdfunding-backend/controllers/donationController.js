const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");

// ✅ Make a donation
const makeDonation = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { campaignId, amount, message } = req.body;
    const donorId = req.user._id; // Ensure the user is authenticated

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

    await donation.save({ session });

    // Update campaign raisedAmount
    campaign.raisedAmount += amount;
    await campaign.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ success: true, donation });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error making donation:", error);
    res.status(500).json({ message: "Server error making donation" });
  }
};


module.exports = { makeDonation };

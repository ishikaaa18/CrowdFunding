const Campaign = require("../models/Campaign");
const User = require("../models/User");

/* ✅ Get all campaigns */
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("creator", "name email");
    res.status(200).json(campaigns);
  } catch (err) {
    console.error("❌ Error fetching campaigns:", err);
    res.status(500).json({ error: "Server error fetching campaigns" });
  }
};

/* ✅ Get a single campaign */
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate("creator", "name email");
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });
    res.status(200).json(campaign);
  } catch (err) {
    console.error("❌ Error fetching campaign:", err);
    res.status(500).json({ error: "Server error fetching campaign" });
  }
};

/* ✅ Create a new campaign (with user tracking) */
exports.createCampaign = async (req, res) => {
  try {
    const { title, description, goalAmount, deadline } = req.body;

    if (!title || !description || !goalAmount || !deadline) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const newCampaign = new Campaign({
      title,
      description,
      goalAmount: Number(goalAmount),
      raisedAmount: 0,
      deadline: new Date(deadline),
      creator: req.user._id,
      image: imagePath,
    });

    await newCampaign.save();

    // ✅ Track campaign in user's profile
    await User.findByIdAndUpdate(req.user._id, {
      $push: { createdCampaigns: newCampaign._id },
    });

    res.status(201).json({ message: "Campaign created successfully", campaign: newCampaign });
  } catch (err) {
    console.error("❌ Error creating campaign:", err);
    res.status(500).json({ error: "Server error creating campaign" });
  }
};

/* ✅ Update a campaign */
exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    // Ensure only the creator can update
    if (String(campaign.creator) !== String(req.user._id)) {
      return res.status(403).json({ error: "Unauthorized to update this campaign" });
    }

    // Update campaign details
    const updatedData = req.body;
    if (req.file) updatedData.image = req.file.path.replace(/\\/g, "/");

    const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json({ message: "Campaign updated successfully", campaign: updatedCampaign });
  } catch (err) {
    console.error("❌ Error updating campaign:", err);
    res.status(500).json({ error: "Server error updating campaign" });
  }
};

/* ✅ Delete a campaign */
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    // Ensure only the creator can delete
    if (String(campaign.creator) !== String(req.user._id)) {
      return res.status(403).json({ error: "Unauthorized to delete this campaign" });
    }

    await campaign.deleteOne();

    // ✅ Remove campaign from user's profile
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { createdCampaigns: campaign._id },
    });

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting campaign:", err);
    res.status(500).json({ error: "Server error deleting campaign" });
  }
};

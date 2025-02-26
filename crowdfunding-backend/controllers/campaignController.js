const Campaign = require("../models/Campaign.js");

// ✅ Create a new campaign
const createCampaign = async (req, res) => {
  try {
    const { title, description, goalAmount, deadline, imageUrl } = req.body;

    const campaign = await Campaign.create({
      title,
      description,
      goalAmount,
      deadline,
      creator: req.user._id, // User creating the campaign
      imageUrl,
    });

    res.status(201).json({ message: "Campaign created successfully", campaign });
  } catch (error) {
    console.error("❌ Error creating campaign:", error);
    res.status(500).json({ message: "Server error creating campaign", error });
  }
};

// ✅ Get all campaigns
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("creator", "name email");
    res.json(campaigns);
  } catch (error) {
    console.error("❌ Error fetching campaigns:", error);
    res.status(500).json({ message: "Server error fetching campaigns", error });
  }
};

// ✅ Get a single campaign by ID
const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate("creator", "name email");

    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    res.json(campaign);
  } catch (error) {
    console.error("❌ Error fetching campaign:", error);
    res.status(500).json({ message: "Server error fetching campaign", error });
  }
};

// ✅ Update a campaign (Only creator can update)
const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    if (campaign.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this campaign" });
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({ message: "Campaign updated successfully", updatedCampaign });
  } catch (error) {
    console.error("❌ Error updating campaign:", error);
    res.status(500).json({ message: "Server error updating campaign", error });
  }
};

// ✅ Delete a campaign (Only creator can delete)
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    if (campaign.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this campaign" });
    }

    await campaign.deleteOne();
    res.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting campaign:", error);
    res.status(500).json({ message: "Server error deleting campaign", error });
  }
};

// ✅ Export all functions
module.exports = { createCampaign, getAllCampaigns, getCampaignById, updateCampaign, deleteCampaign };

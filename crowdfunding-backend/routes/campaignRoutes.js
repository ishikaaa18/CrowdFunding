const express = require("express");
const Campaign = require("../models/Campaign"); // ✅ Correct Model
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

/* ✅ Fetch all campaigns */
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find(); 
    res.json(campaigns);
  } catch (err) {
    console.error("❌ Error fetching campaigns:", err);
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
});

/* ✅ Fetch a single campaign by ID */
router.get("/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    res.json(campaign);
  } catch (err) {
    console.error("❌ Error fetching campaign:", err);
    res.status(500).json({ error: "Failed to fetch campaign" });
  }
});

/* ✅ Create a new campaign (Protected) */
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, goalAmount, deadline, image } = req.body;

    if (!title || !description || !goalAmount || !deadline || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCampaign = new Campaign({
      title,
      description,
      goalAmount: Number(goalAmount),
      raisedAmount: 0, // Default value
      deadline: new Date(deadline),
      creator: req.user._id, // Set from middleware
      image
    });

    await newCampaign.save();

    res.status(201).json({ message: "Campaign created successfully", campaign: newCampaign });
  } catch (err) {
    console.error("❌ Error creating campaign:", err);
    res.status(500).json({ error: "Failed to create campaign" });
  }
});



/* ✅ Update a campaign (Protected, Only Creator) */
router.put("/:id", protect, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    if (campaign.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized to update this campaign" });
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({ message: "Campaign updated successfully", campaign: updatedCampaign });
  } catch (err) {
    console.error("❌ Error updating campaign:", err);
    res.status(500).json({ error: "Failed to update campaign" });
  }
});


/* ✅ Delete a campaign (Protected, Only Creator) */
router.delete("/:id", protect, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    if (campaign.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized to delete this campaign" });
    }

    await campaign.deleteOne();
    res.json({ message: "Campaign deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting campaign:", err);
    res.status(500).json({ error: "Failed to delete campaign" });
  }
});


module.exports = router;



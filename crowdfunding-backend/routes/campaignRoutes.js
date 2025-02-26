const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign"); // ✅ Correct Model
const { protect } = require("../middleware/authMiddleware.js"); // ✅ Protect routes for authentication

// ✅ Fetch all campaigns
router.get("/", async (req, res) => { // Removed "/campaigns" (handled in server.js)
  try {
    const campaigns = await Campaign.find(); 
    res.json(campaigns);
  } catch (err) {
    console.error("❌ Error fetching campaigns:", err);
    res.status(500).json({ error: "Server error fetching campaigns" });
  }
});

// ✅ Fetch single campaign by ID
router.get("/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });
    res.json(campaign);
  } catch (err) {
    console.error("❌ Error fetching campaign:", err);
    res.status(500).json({ error: "Server error fetching campaign" });
  }
});

// ✅ Create a new campaign (Protected Route)
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, goal, raised, creator } = req.body;

    if (!title || !description || !goal || !creator) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCampaign = new Campaign({ title, description, goal, raised, creator });
    await newCampaign.save();

    res.status(201).json({ message: "Campaign created successfully", campaign: newCampaign });
  } catch (err) {
    console.error("❌ Error creating campaign:", err);
    res.status(500).json({ error: "Server error creating campaign" });
  }
});

// ✅ Update a campaign (Protected, Only Creator)
router.put("/:id", protect, async (req, res) => {
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCampaign) return res.status(404).json({ error: "Campaign not found" });

    res.json({ message: "Campaign updated successfully", campaign: updatedCampaign });
  } catch (err) {
    console.error("❌ Error updating campaign:", err);
    res.status(500).json({ error: "Server error updating campaign" });
  }
});

// ✅ Delete a campaign (Protected, Only Creator)
router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedCampaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!deletedCampaign) return res.status(404).json({ error: "Campaign not found" });

    res.json({ message: "Campaign deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting campaign:", err);
    res.status(500).json({ error: "Server error deleting campaign" });
  }
});

module.exports = router;



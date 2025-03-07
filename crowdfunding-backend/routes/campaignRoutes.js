const express = require("express");
const {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getFeaturedCampaigns, // ✅ Added this
} = require("../controllers/campaignController.js");
const { protect } = require("../middleware/authMiddleware.js");
const upload = require("../middleware/uploadMiddleware.js");

const router = express.Router();

// ✅ Public Routes
router.get("/", getAllCampaigns);
router.get("/featured", getFeaturedCampaigns); // ✅ New Route for Featured Campaigns
router.get("/:id", getCampaignById);

// ✅ Protected Routes (Require Authentication)
router.post("/", protect, upload.single("image"), createCampaign);
router.put("/:id", protect, upload.single("image"), updateCampaign);
router.delete("/:id", protect, deleteCampaign);

module.exports = router;

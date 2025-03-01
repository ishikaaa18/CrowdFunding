const express = require("express");
const {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaignController.js");
const { protect } = require("../middleware/authMiddleware.js");
const upload = require("../middleware/uploadMiddleware.js");

const router = express.Router();

router.get("/", getAllCampaigns);
router.get("/:id", getCampaignById);
router.post("/", protect, upload.single("image"), createCampaign);
router.put("/:id", protect, upload.single("image"), updateCampaign);
router.delete("/:id", protect, deleteCampaign);

module.exports = router;


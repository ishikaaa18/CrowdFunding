const express = require("express");
const { makeDonation, getCampaignDonations } = require("../controllers/donationController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* ✅ Route to make a donation (Requires authentication) */
router.post("/", protect, async (req, res, next) => {
  try {
    const { campaignId, amount } = req.body;

    // Validation: Ensure amount is a positive number
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Donation amount must be greater than zero." });
    }

    // Call the donation controller
    await makeDonation(req, res);
  } catch (error) {
    next(error);
  }
});

/* ✅ Route to get all donations for a specific campaign */
router.get("/:campaignId", async (req, res, next) => {
  try {
    await getCampaignDonations(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;


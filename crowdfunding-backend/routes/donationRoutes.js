const express = require('express');
const { makeDonation, getCampaignDonations } = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware'); 

const router = express.Router();

// Route to make a donation (Requires authentication)
router.post('/', protect, makeDonation);

// Route to get all donations for a specific campaign
router.get('/:campaignId', getCampaignDonations);

module.exports = router;

const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign", // ✅ FIXED: Changed "Project" to "Campaign"
    required: true
  },
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;



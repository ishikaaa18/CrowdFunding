const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    goalAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 }, // ✅ Default value added
    deadline: { type: Date, required: true },
    status: { type: String, enum: ["active", "completed"], default: "active" }, // ✅ Default value added
    image: { type: String, required: true }
  },
  { timestamps: true }
);

const Campaign = mongoose.model("Campaign", CampaignSchema);
module.exports = Campaign;


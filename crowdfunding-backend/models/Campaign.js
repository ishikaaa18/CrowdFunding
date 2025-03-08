const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    goalAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
    image: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isFeatured: { type: Boolean, default: false }, 
    category: { type: String, required: true }
  },
  { timestamps: true }
);

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;

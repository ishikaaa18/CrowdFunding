const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true }, // Added phone number
    bio: { type: String }, // Added bio
    profileImage: { type: String }, // Profile picture URL
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createdCampaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Campaign" }],
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }],
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    next(error);
  }
});

// Compare password
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

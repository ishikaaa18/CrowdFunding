const User = require("../models/User.js");
const Campaign = require("../models/Campaign.js");
const Donation = require("../models/Donation.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// ✅ Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ✅ Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, password });
    await user.save(); // Ensure password hashing works before saving

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("❌ Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const createdCampaigns = await Campaign.find({ creator: user._id });
    const donations = await Donation.find({ donorId: user._id }).populate(
      "campaignId",
      "title goalAmount raisedAmount"
    );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdCampaigns,
      donations,
    });
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get User Dashboard Data
const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const createdCampaigns = await Campaign.find({ creator: userId });

    const donations = await Donation.find({ donorId: userId }).populate(
      "campaignId",
      "title goalAmount raisedAmount"
    );

    res.status(200).json({ createdCampaigns, donations });
  } catch (error) {
    console.error("❌ Error fetching user dashboard data:", error);
    res.status(500).json({ message: "Server error fetching user dashboard data" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, getUserDashboard };

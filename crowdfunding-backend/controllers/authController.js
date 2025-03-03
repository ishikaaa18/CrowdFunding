const User = require("../models/User.js");
const Campaign = require("../models/Campaign.js");
const Donation = require("../models/Donation.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, bio, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Handle profile image upload
    const profileImage = req.file ? `/uploads/profileImages/${req.file.filename}` : "";

    // Create & save user
    const user = new User({ name, email, phone, bio, profileImage, password });
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
      profiePicture: user.profileImage,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
      profileImage: user.profileImage,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const createdCampaigns = await Campaign.find({ creator: user._id });
    const donations = await Donation.find({ donorId: user._id }).populate("campaignId", "title goalAmount raisedAmount");

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
      profileImage: user.profileImage,
      role: user.role,
      createdCampaigns,
      donations,
    });
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };

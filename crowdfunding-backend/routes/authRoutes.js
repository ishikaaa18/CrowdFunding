const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register Route ✅ Handles Image Upload
router.post("/register", upload.single("profileImage"), registerUser);

// Login Route ✅
router.post("/login", loginUser);

// Get User Profile ✅ Requires Authentication
router.get("/profile", protect, getUserProfile);

module.exports = router;



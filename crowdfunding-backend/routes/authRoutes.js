const express = require("express");
const { registerUser, loginUser, getUserProfile, getUserDashboard } = require("../controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.get("/dashboard", protect, getUserDashboard); // ✅ Added dashboard route

module.exports = router;


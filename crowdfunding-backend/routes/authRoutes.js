const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;



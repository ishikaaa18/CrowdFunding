const express = require("express");
const multer = require("multer");
const path = require("path");
const Campaign = require("../models/Campaign");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

/* ✅ Multer Storage Configuration */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/")); // Store images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    // Allow only images
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      return cb(new Error("Only images (JPG, JPEG, PNG, GIF) are allowed"));
    }
  },
});

/* ✅ Create a new campaign (Protected) */
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    console.log("📝 Request Body:", req.body);
    console.log("📸 Uploaded File:", req.file);

    const { title, description, goalAmount, deadline } = req.body;

    if (!title || !description || !goalAmount || !deadline || !req.file) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Create and save the campaign
    const newCampaign = new Campaign({
      title,
      description,
      goalAmount: Number(goalAmount),
      raisedAmount: 0,
      deadline: new Date(deadline),
      creator: req.user._id, // 🔥 Get user ID from auth middleware
      image: req.file.path.replace(/\\/g, "/"), // Normalize file path
    });

    await newCampaign.save();

    res.status(201).json({ message: "Campaign created successfully", campaign: newCampaign });
  } catch (err) {
    console.error("❌ Error creating campaign:", err);
    res.status(500).json({ error: err.message || "Server error creating campaign" });
  }
});

/* ✅ Export Router */
module.exports = router;

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directories exist
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/"; // Default upload path

    if (req.path.includes("profile")) {
      uploadPath = "uploads/profileImages/"; // Profile images directory
    } else if (req.path.includes("campaign")) {
      uploadPath = "uploads/campaignImages/"; // Campaign images directory
    }

    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image file."), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;



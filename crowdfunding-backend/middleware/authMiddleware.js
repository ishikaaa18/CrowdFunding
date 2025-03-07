const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User.js");

dotenv.config();

const protect = async (req, res, next) => {
  let token;

  try {
    // Check if Authorization Header Exists
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token provided" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found, invalid token" });
    }

    next();
  } catch (error) {
    console.error("❌ Token Verification Failed:", error.message);

    let message = "Not authorized, token failed";
    if (error.name === "JsonWebTokenError") {
      message = "Invalid token";
    } else if (error.name === "TokenExpiredError") {
      message = "Token expired, please log in again";
    }

    return res.status(401).json({ message });
  }
};

module.exports = { protect };

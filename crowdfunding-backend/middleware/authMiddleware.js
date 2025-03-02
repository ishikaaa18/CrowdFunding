const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User.js");

dotenv.config();

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found, invalid token" });
    }

    next();
  } catch (error) {
    console.error("❌ Token Verification Failed:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protect };

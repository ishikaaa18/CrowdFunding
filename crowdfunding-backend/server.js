const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes.js");
const donationRoutes = require("./routes/donationRoutes.js");
const campaignRoutes = require("./routes/campaignRoutes.js");


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS: Allow frontend (localhost:5173) to access backend (localhost:5000)
app.use(cors({
  origin: "http://localhost:5173", // Fixed port from 5174 to 5173
  credentials: true, // ✅ Allows cookies & auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ✅ Enhanced Security with Helmet
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP if using inline scripts
  crossOriginResourcePolicy: { policy: "cross-origin" } // Allow images & assets from different origins
}));

// ✅ MongoDB Connection with Improved Error Handling
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/uploads", express.static("uploads"));


// ✅ Default Route
app.get("/", (req, res) => {
  res.send("🚀 Crowdfunding API is running");
});

// ✅ 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

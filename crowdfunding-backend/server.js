const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const authRoutes = require("./routes/authRoutes.js");
const donationRoutes = require("./routes/donationRoutes.js");
const campaignRoutes = require("./routes/campaignRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes");

/* ✅ Load Environment Variables */
dotenv.config();

/* ✅ Initialize Express App */
const app = express();
const PORT = process.env.PORT || 5000;

/* ✅ CORS Configuration (Allow Frontend Access) */
app.use(
  cors({
    origin: "http://localhost:5173", // Fixed frontend port
    credentials: true, // Allow cookies & auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ✅ Security Middleware */
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for inline scripts
    crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow images/assets from different origins
  })
);

/* ✅ Express Middleware */
app.use(express.json());

/* ✅ Static File Serving */
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

/* ✅ MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

/* ✅ API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/dashboard", dashboardRoutes);


/* ✅ Default Route */
app.get("/", (req, res) => {
  res.send("🚀 Crowdfunding API is running");
});

/* ✅ 404 Not Found Middleware */
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

/* ✅ Global Error Handler */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

/* ✅ Start Server */
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

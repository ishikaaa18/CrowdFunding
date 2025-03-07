const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");
const connectDB = require("./config/db"); // ✅ Import MongoDB connection
const authRoutes = require("./routes/authRoutes.js");
const donationRoutes = require("./routes/donationRoutes.js");
const campaignRoutes = require("./routes/campaignRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");

/* ✅ Load Environment Variables */
dotenv.config();

/* ✅ Initialize Express App */
const app = express();
const PORT = process.env.PORT || 5000;

/* ✅ Connect to MongoDB */
connectDB();

/* ✅ CORS Configuration */
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ✅ Security & Performance Middleware */
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(express.json());

/* ✅ Serve Static Files */
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  setHeaders: (res, path) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin"); // Allow image sharing
  }
}));


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
  res.status(404).json({ success: false, message: "Route not found" });
});

/* ✅ Global Error Handler */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || "Internal Server Error" });
});

/* ✅ Start Server */
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

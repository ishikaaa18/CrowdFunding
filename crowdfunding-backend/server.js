const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes.js');
const donationRoutes = require('./routes/donationRoutes.js');
const campaignRoutes = require("./routes/campaignRoutes"); // ✅ Using only campaigns

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Fix CORS: Allow frontend (localhost:5173) to access backend (localhost:5000)
app.use(cors({
  origin: "http://localhost:5173", // ✅ Allow frontend
  credentials: true, // ✅ Allow cookies & authentication headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ✅ Add OPTIONS method for preflight requests
  allowedHeaders: ["Content-Type", "Authorization"] // ✅ Allow headers for auth
}));

app.use(express.json()); // ✅ Apply JSON parsing after CORS
app.use(helmet());

// Connect to MongoDB with better error handling
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1); // Stop server if DB fails
  });

// Routes
app.use('/api/donations', donationRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/campaigns", campaignRoutes); // ✅ Removed /api/projects

// Sample Route
app.get('/', (req, res) => {
  res.send('Crowdfunding API is running');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes.js');
const projectRoutes = require ('./routes/projectRoutes.js');
const donationRoutes = require('./routes/donationRoutes.js');


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));


app.use('/api/donations', donationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// Sample Route
app.get('/', (req, res) => {
  res.send('Crowdfunding API is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

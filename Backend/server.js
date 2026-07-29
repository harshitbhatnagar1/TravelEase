const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 5000;


const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// SAFE fallback route (for frontend routing, excluding API)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/home.html'));
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected');

  // ✅ Start the server only after DB connection
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

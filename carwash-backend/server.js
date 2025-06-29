const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bookingsRoute = require('./routes/bookings');
const contactRoute = require('./routes/contact');
const adminRoute = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const corsOptions = {
  origin: [
    "https://www.prowash.it.com",
    "https://carwash-backend-1-2urg.onrender.com"
  ],
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("/*", cors(corsOptions));
app.use(express.json());

// Serve static files from 'public' folder
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/bookings', bookingsRoute);
app.use('/api/contact', contactRoute);
app.use('/api/admin', adminRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

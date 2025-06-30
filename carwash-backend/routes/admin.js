require('dotenv').config(); // add this at the top if not already present
const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();

const Booking = require('../models/Booking');
const Contact = require("../models/contact");


// Dummy admin credentials for testing
require('dotenv').config(); // 👈 Make sure this is at the top of the file

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
 // Change this later for real use

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// GET /api/admin/bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// GET /api/admin/contacts
router.get('/contacts', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// DELETE /api/admin/bookings/:id
router.delete('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id); // ✅ correct model
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting booking" });
  }
});



// DELETE /api/admin/contacts/:id

router.delete('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id));


    if (!contact) {
      return res.status(404).json({ error: "Contact message not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.error("Error deleting contact:", err);
    res.status(500).json({ error: "Error deleting contact message" });
  }
});

module.exports = router;

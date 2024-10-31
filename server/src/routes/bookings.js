const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

router.post('/', async (req, res) => {
  try {
    const result = await Booking.create(req.body);
    res.status(201).json({ 
      message: 'Booking created successfully',
      booking_id: result.insertedId 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating booking' });
  }
});

router.get('/listing/:listingId', async (req, res) => {
  try {
    const bookings = await Booking.findByListingId(req.params.listingId);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

module.exports = router;
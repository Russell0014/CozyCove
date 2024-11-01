const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');

// Get random listings
router.get('/random', async (req, res) => {
  try {
    const listings = await Listing.getRandomListings();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching random listings' });
  }
});

// Search listings with filters
router.get('/search', async (req, res) => {
  try {
    const filters = {
      location: req.query.location,
      propertyType: req.query.propertyType,
      bedrooms: req.query.bedrooms
    };
    
    const listings = await Listing.findByFilters(filters);
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching filtered listings' });
  }
});

// Get single listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching listing' });
  }
});

module.exports = router;
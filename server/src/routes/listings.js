const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');

// Get random listings for homepage
router.get('/random', async (req, res) => {
  for(let attempt = 1; attempt <= 12; attempt++) {
    try {
      const listings = await Listing.getRandomListings();
      
      if (listings && listings.length > 0) {
        return res.json(listings);
      }
      
    } catch (error) {
      return res.status(500).json({ 
        error: 'Database error while fetching random listings',
        details: error.message 
      });
    }
  }
  
  return res.status(404).json({ 
    error: 'No listings found after 10 attempts'
  });
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
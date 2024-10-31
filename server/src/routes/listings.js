const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');

router.get('/', async (req, res) => {
  try {
    const filters = {
      location: req.query.location,
      propertyType: req.query.propertyType,
      bedrooms: req.query.bedrooms
    };
    
    const listings = await Listing.findByFilters(filters);
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching listings' });
  }
});

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
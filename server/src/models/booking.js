const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');

class Booking {
  static async create(bookingData) {
    const db = getDB();
    const booking = {
      listing_id: new ObjectId(String(bookingData.listing_id)),
      start_date: new Date(bookingData.start_date),
      end_date: new Date(bookingData.end_date),
      guest_info: bookingData.guest_info,
      created_at: new Date()
    };
    
    const result = await db.collection('bookings').insertOne(booking);
    return result;
  }

  static async findByListingId(listingId) {
    const db = getDB();
    return await db.collection('bookings')
      .find({ listing_id: new ObjectId(String(listingId)) })
      .toArray();
  }
}

module.exports = Booking;
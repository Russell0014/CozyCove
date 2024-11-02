const { getDB } = require('../config/db');

class Booking {
  static async create(bookingData) {
    const db = getDB();
    const booking = {
      listing_id: String(bookingData.listing_id),
      start_date: new Date(bookingData.start_date),
      end_date: new Date(bookingData.end_date),
      name: bookingData.name,
      email: bookingData.email,
      mobile_phone: bookingData.mobile_phone,
      postal_address: bookingData.postal_address,
      home_address: bookingData.home_address,
      created_at: new Date()
    };

    const result = await db.collection('bookings').insertOne(booking);
    return result;
  }

  static async findByListingId(listingId) {
    const db = getDB();
    return await db.collection('bookings')
      .find({ listing_id: String(listingId) })
      .toArray();
  }
}

module.exports = Booking;
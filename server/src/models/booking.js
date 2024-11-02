const { getDB } = require('../config/db');

class Booking {
  static async create(bookingData) {
    const db = getDB();
    const booking = {
      listing_id: String(bookingData.listing_id),
      start_date: new Date(bookingData.start_date),
      end_date: new Date(bookingData.end_date),
      client: {
        name: bookingData.client.name,
        email: bookingData.client.email,
        mobile_phone: bookingData.client.mobile_phone,
        postal_address: bookingData.client.postal_address,
        home_address: bookingData.client.home_address
      },
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
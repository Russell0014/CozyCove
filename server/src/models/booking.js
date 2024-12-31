const { getDB } = require('../config/db');

class Booking {
  static async create(bookingData) {
    const db = await getDB();
    const booking = {
      booking_id: String(bookingData.booking_id),
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

    await db.collection('bookings').insertOne(booking);
    return booking.booking_id;
  }

  static async findByListingId(listingId) {
    const db = await getDB();
    return await db.collection('bookings')
      .find({ listing_id: String(listingId) })
      .toArray();
  }

  static async findById(bookingId) {
    const db = await getDB();
    return await db.collection('bookings')
      .findOne({ booking_id: String(bookingId) });
  }
}

module.exports = Booking;
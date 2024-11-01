const { getDB } = require('../config/db');

class Listing {
  static async findByFilters(filters) {
    const db = getDB();
    const query = {};

    if (filters.location) query["address.market"] = filters.location;
    if (filters.propertyType) query.property_type = filters.propertyType;
    if (filters.bedrooms) query.bedrooms = parseInt(filters.bedrooms);

    return await db.collection('listingsAndReviews')
      .aggregate([
        { $match: query },
        { $sample: { size: 10 } },
        { $project: {
          name: 1,
          summary: 1, 
          price: 1,
          "review_scores.review_scores_rating": 1,
          "address.market": 1,
          "images.picture_url": 1
        }}
      ])
      .toArray();
    
  }

  static async findById(id) {
    const db = getDB();
    return await db.collection('listingsAndReviews').findOne(
      { _id: id },
      {
        projection: {
          name: 1,
          summary: 1,
          price: 1,
          "review_scores.review_scores_rating": 1,
          "address.market": 1,
          "images.picture_url": 1
        }
      }
    );
  }
}

module.exports = Listing;
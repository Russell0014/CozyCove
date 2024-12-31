const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
let client = null;
let db = null;

const connectDB = async () => {
  try {
    // Create new client if not exists
    if (!client) {
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    }

    // Connect if not already connected
    if (!db) {
      await client.connect();
      db = client.db("sample_airbnb");
      console.log("Connected to MongoDB Atlas");
    }
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

const getDB = async () => {
  if (!db) {
    await connectDB();
  }
  return db;
};

module.exports = { connectDB, getDB };
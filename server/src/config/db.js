const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
let db;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDB = async () => {
  try {

    if(db){
      console.log('database is already connected');
      return db;
    }
    
    await client.connect();
    db = client.db("sample_airbnb");
    console.log("Connected to MongoDB Atlas");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

module.exports = { connectDB, getDB };
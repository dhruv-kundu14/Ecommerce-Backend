const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUrl =
  process.env.MONGO_URL ||
  'mongodb+srv://dhruv5kun:dhruvMongo@ecommerce-backend.s160e.mongodb.net/ecomm-backend?retryWrites=true&w=majority';

let db;

async function MongoConnection() {
  const client = new MongoClient(mongoUrl, {
    useNewUrlParser: true, // Enable URL parser explicitly (optional for newer drivers)
    useUnifiedTopology: true, // Ensure the driver uses the unified topology engine
    tls: true, // Ensure TLS/SSL is explicitly enabled
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(); // Automatically uses the default database in the connection string
  } catch (error) {
    // Enhanced error handling
    console.error('Error connecting to MongoDB:', error.message);

    // Suggest potential solutions
    if (error.name === 'MongoParseError') {
      console.error(
        'Check your connection string format. It must start with "mongodb://" or "mongodb+srv://".'
      );
    } else if (error.name === 'MongoNetworkError') {
      console.error(
        'Network error detected. Verify your network configuration and ensure your IP is whitelisted in MongoDB Atlas.'
      );
    }

    // Re-throw the error to notify the calling function
    throw error;
  }
}

function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call MongoConnection first.');
  }
  return db;
}

module.exports = { MongoConnection, getDb };

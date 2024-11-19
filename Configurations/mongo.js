const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URL || 'mongodb+srv://dhruv5kun:dhruvMongo@ecommerce-backend.s160e.mongodb.net/ecomm-backend';

let db; // Singleton database instance

/**
 * Establishes a connection to the MongoDB server.
 * Initializes the database instance if not already connected.
 * @returns {Promise<void>} Resolves when the database is connected.
 */
async function MongoConnection() {
  if (!db) {
    try {
      const client = new MongoClient(MONGO_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      });
      await client.connect();
      console.log('Connected to MongoDB');
      db = client.db(); // Automatically uses the default database from the connection string
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      throw error;
    }
  }
}

/**
 * Retrieves the connected database instance.
 * @returns {Db} The MongoDB database instance.
 * @throws {Error} If the database connection is not initialized.
 */
function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call MongoConnection first.');
  }
  return db;
}

// Export the functions
module.exports = { MongoConnection, getDb };

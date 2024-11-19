const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URL || 'mongodb+srv://dhruv5kun:test_pwd@ecommerce-backend.noyuh.mongodb.net/ecomm-backend?retryWrites=true&w=majority';

let db; // Singleton database instance

async function MongoConnection() {
  if (!db) {
    try {
      const client = new MongoClient(MONGO_URI);
      await client.connect();
      console.log('Connected to MongoDB');
      db = client.db();
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      throw error;
    }
  }
}

function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call MongoConnection first.');
  }
  return db;
}

module.exports = { MongoConnection, getDb };

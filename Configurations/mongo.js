const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URL || 'mongodb+srv://dhruv5kun:dhruvMongo@ecommerce-backend.s160e.mongodb.net/ecomm-backend';

let db; // Singleton database instance

async function MongoConnection() {
  if (!db) {
    try {
      const client = new MongoClient(MONGO_URI, {
        tls: true, // Ensure TLS/SSL is explicitly enabled
        tlsAllowInvalidCertificates: true, // Use cautiously
      });
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

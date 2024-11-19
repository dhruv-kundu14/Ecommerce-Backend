const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUrl =
  process.env.MONGO_URL ||
  'mongodb+srv://dhruv5kun:dhruvMongo@ecommerce-backend.s160e.mongodb.net/ecomm-backend?retryWrites=true&w=majority';

let db;

async function MongoConnection() {
  const client = new MongoClient(mongoUrl, {
    tls: true, // Ensure TLS/SSL is explicitly enabled
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("ecomm-backend"); // Use the database name directly
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call MongoConnection first.");
  }
  return db;
}

module.exports = { MongoConnection, getDb };

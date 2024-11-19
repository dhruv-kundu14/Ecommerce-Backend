const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL || 'mongodb+srv://dhruv5kun:dhruvMongo@ecommerce-backend.s160e.mongodb.net/?retryWrites=true&w=majority';

let db;

async function MongoConnection() {
  const client = new MongoClient(mongoUrl);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("ecomm-backend");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Propagate the error to handle it in the main app
  }
}

function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call MongoConnection first.");
  }
  return db;
}

module.exports = { MongoConnection, getDb };

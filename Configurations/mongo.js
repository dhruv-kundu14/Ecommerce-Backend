// connection/mongo.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
let db;

async function MongoConnection() {
  const client = new MongoClient(mongoUrl);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("Ecommerce");
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

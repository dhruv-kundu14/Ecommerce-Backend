const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const { MongoConnection } = require('./Configurations/mongo.js');
const { notFound, errorHandler } = require('./Middleware/error.js');

// Initialize Express app
const app = express();

// Load configurations
const port = process.env.APPPORT || 4123; // Default to 4123 if undefined
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : [
      'http://localhost:5173',
      'http://localhost:9090',
      'http://localhost:3000',
      'http://127.0.0.1:5500',
      'https://dhruv-kundu14.github.io',
    ];

// CORS Middleware
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
    methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
  })
);


// Security and JSON Parsing Middleware
app.use(express.json({ limit: '10mb' }));
app.use(require('helmet')());

// Root Test Endpoint
app.get('/common-backend/test', (req, res) => {
  console.log('Request received for Root /common-backend --> On Domain:', req.hostname);
  res.json({
    Message: 'Hello, this is common backend',
    Status: '200',
    url: req.hostname,
  });
});

// Routes Middleware
app.use('/common-backend', require('./Routes/routes.js'));

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Establish MongoDB connection and start server
async function startServer() {
  try {
    // Establish MongoDB connection before starting the server
    await MongoConnection();

    // Start the HTTP server only after DB connection is successful
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to establish MongoDB connection:', err);
  }
}

// Start the server with DB connection
startServer();

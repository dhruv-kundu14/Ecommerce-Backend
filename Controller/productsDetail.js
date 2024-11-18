// controllers/registerForm.js
const { getDb } = require('../connection/mongo'); // Adjust the path if necessary

// Function to handle registration
const registerUser = async (req, res) => {
  try {
    const userData = req?.body;

    // Validation logic can be added here if necessary

    // Insert user data into MongoDB
    const result = await getDb().collection('userData').insertOne(userData);
    res.status(201).json({ message: 'User registered successfully', result });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  registerUser,
};

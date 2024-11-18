const jwt = require('jsonwebtoken');
const { getDb } = require('../Configurations/mongo');
const jwtKey = 'E-cOmm'; // JWT Secret Key

// Register a new user
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await getDb().collection('userData').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Insert the new user into the database
    const result = await getDb().collection('userData').insertOne({ email, password });
    res.status(201).json({ message: 'User registered successfully', result });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getDb().collection('userData').findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    jwt.sign({ userId: user._id, email: user.email }, jwtKey, { expiresIn: '2h' }, (err, token) => {
      if (err) {
        console.error('Error generating token:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { registerUser, loginUser };

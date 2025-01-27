const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const router = express.Router();
const authenticateToken = require('../middleware/authmiddleware');

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || '123456';

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate required fields
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Name, Email, password, and role are required' });
  }

  // Validate role
  const validRoles = ['admin', 'it support', 'user'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send('Invalid email or password');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send('Invalid email or password');
      }
  
      // Generate token
      const token = jwt.sign(
        { id: user._id, name: user.name ,email: user.email, role: user.role },
        JWT_SECRET, // Make sure to use a secret key stored in .env file
        { expiresIn: '1h' }  // Set expiration time for the token
      );
  
      res.status(200).json({
        message: 'Login successful',
        token,  // Send the token back to the client
        role: user.role  // Optionally, send the user's role
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  
  

// Protected Route with Role-Based Access Control
// router.get('/admin-dashboard', authenticateToken, (req, res) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ error: 'Access denied' });
//   }
//   res.send(`Welcome, ${req.user.email}. You are an admin.`);
// });

module.exports = router;

const express = require('express');
const authenticateToken = require('../middleware/authmiddleware');  // Include the authenticateToken middleware
const router = express.Router();

// Admin Dashboard Route
router.get('/admin-dashboard', authenticateToken, (req, res) => {
  // Check if the user has the 'admin' role
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access Denied: You do not have permission to view this page');
  }

  res.status(200).send(`Welcome, Admin: ${req.user.email}`);
});

module.exports = router;

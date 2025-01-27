const express = require('express');
const router = express.Router();
const { createIssue } = require('../controller/itSupportController'); // Import the controller
const authenticateToken = require('../middleware/authenticateToken'); // Middleware to check authentication

// Create an issue
router.post('/create', authenticateToken, createIssue); // Use authenticateToken to ensure the user is authenticated

module.exports = router;

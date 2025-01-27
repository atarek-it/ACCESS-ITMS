const express = require('express');
const router = express.Router();
const ITSupport = require('../models/Itsupport'); // Import the IT support model
const authenticateToken = require('../middleware/authmiddleware'); // Your auth middleware

// Route to submit an issue
router.post('/api/contact-it-support', authenticateToken, async (req, res) => {
  const { name, email, problem } = req.body;

  if (!name || !email || !problem) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const issue = new ITSupport({ name, email, problem });
    await issue.save(); // Save the issue to the database
    res.status(201).json({ message: 'Issue submitted successfully!' });
  } catch (error) {
    console.error('Error saving issue:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Route to fetch all issues (For IT support)
router.get('/api/it-support/issues', authenticateToken, async (req, res) => {
  try {
    const issues = await ITSupport.find().sort({ createdAt: -1 }); // Retrieve all issues, sorted by latest
    res.status(200).json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});
// Route to update the response
router.post('/api/it-support/respond/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { response } = req.body;
  
    try {
      const issue = await ITSupport.findById(id);
      if (!issue) {
        return res.status(404).json({ message: 'Issue not found.' });
      }
  
      issue.response = response;
      await issue.save();
  
      res.status(200).json({ message: 'Response sent successfully!' });
    } catch (error) {
      console.error('Error updating response:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  });
  
module.exports = router;

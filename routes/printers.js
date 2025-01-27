const express = require('express');
const router = express.Router();
const Printer = require('../models/Printers'); // Replace with your model path

// POST route to add a new printer
router.post('/api/printers', async (req, res) => {
  const { ip, officeNo, officeName, model, adminPassword } = req.body;

  // Validation: Ensure all required fields are provided
  if (!ip || !officeNo || !officeName || !model || !adminPassword) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const newPrinter = new Printer({
      ip,
      officeNo,
      officeName,
      model,
      adminPassword,
    });
    const savedPrinter = await newPrinter.save();
    res.status(201).json(savedPrinter);
  } catch (error) {
    console.error('Error saving printer:', error); // Logs the error to the console
    res.status(500).json({ error: 'Internal server error.' });
  }
});


module.exports = router;

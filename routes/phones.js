const express = require('express');
const router = express.Router();
const Phone = require('../models/phone');

// Fetch all phones
router.get('/phones', async (req, res) => {
  try {
    const phones = await Phone.find();
    res.json(phones);
  } catch (error) {
    res.status(500).send('Error fetching phones data');
  }
});

// Add a new phone
router.post('/phones', async (req, res) => {
  const { ip, officeNo, officeName, password } = req.body;

  try {
    const newPhone = new Phone({ ip, officeNo, officeName, password });
    const savedPhone = await newPhone.save();
    res.status(201).json(savedPhone);
  } catch (error) {
    res.status(500).send('Error adding phone');
  }
});

module.exports = router;

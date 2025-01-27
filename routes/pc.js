const express = require('express');
const router = express.Router();
const PC = require('../models/Pc');

// Fetch all PCs
router.get('/pcs', async (req, res) => {
  try {
    const pcs = await PC.find();
    res.json(pcs);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Add a new PC
router.post('/pcs', async (req, res) => {
  const { model, sn, department, person, count } = req.body;

  try {
    const newPC = new PC({ model, sn, department, person, count });
    const savedPC = await newPC.save();
    res.status(201).json(savedPC);
  } catch (error) {
    res.status(500).send('Error adding PC data');
  }
});

module.exports = router;

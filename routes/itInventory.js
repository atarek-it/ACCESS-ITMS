const express = require('express');
const router = express.Router();
const ITInventory = require('../models/itInventory');

// Fetch all IT inventory items
router.get('/it-inventory', async (req, res) => {
  try {
    const items = await ITInventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Add a new inventory item
router.post('/it-inventory', async (req, res) => {
  const { itemName, itemType, serialNumber, location, assignedTo, quantity } = req.body;

  try {
    const newItem = new ITInventory({ itemName, itemType, serialNumber, location, assignedTo, quantity });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).send('Error adding IT inventory item');
  }
});

module.exports = router;

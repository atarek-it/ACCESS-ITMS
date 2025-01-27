const mongoose = require('mongoose');

const ITInventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemType: { type: String, required: true },
  serialNumber: { type: String, required: true },
  location: { type: String, required: true },
  assignedTo: { type: String, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('ITInventory', ITInventorySchema);

const mongoose = require('mongoose');

const pcSchema = new mongoose.Schema({
  model: { type: String, required: true },
  sn: { type: String, required: true },
  department: { type: String, required: true },
  person: { type: String, required: true },
  count: { type: Number, required: true, min: 1 },
});

module.exports = mongoose.model('PC', pcSchema);

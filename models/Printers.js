const mongoose = require('mongoose');

const printerSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  officeNo: { type: String, required: true },
  officeName: { type: String, required: true },
  model: { type: String, required: true },
  adminPassword: { type: String, required: true },
});

const Printer = mongoose.model('Printer', printerSchema);

module.exports = Printer;

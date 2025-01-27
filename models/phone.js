const mongoose = require('mongoose');

const PhoneSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  officeNo: { type: String, required: true },
  officeName: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Phone', PhoneSchema);

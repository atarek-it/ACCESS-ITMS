const mongoose = require('mongoose');

const itSupportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    problem: { type: String, required: true },
    response: { type: String, default: '' }, // New field for response
    createdAt: { type: Date, default: Date.now },
  });
  

const ITSupport = mongoose.model('ITSupport', itSupportSchema);

module.exports = ITSupport;

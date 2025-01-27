const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'it support' }, // Default role is 'it support'
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

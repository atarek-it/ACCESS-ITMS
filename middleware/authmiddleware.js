const jwt = require('jsonwebtoken');
const User = require('../models/Users');  // Update with the correct path for your User model

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Get token from header

  if (!token) {
    return res.status(401).send('Access Denied: No Token Provided');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, "123456");  // Make sure to use the correct secret
    req.user = decoded;

    // Optionally, you can fetch the user from the database to get extra details like role
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).send('User not found');
    }

    req.user = user;  // Attach the user object to the request
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Token Verification Failed:', err);
    return res.status(400).send('Invalid Token');
  }
};

module.exports = authenticateToken;

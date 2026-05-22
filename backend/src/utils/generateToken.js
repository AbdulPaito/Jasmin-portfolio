const jwt = require('jsonwebtoken');

// Generate JWT token with user id
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = generateToken;

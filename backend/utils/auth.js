const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function hashPassword(password) {
  return crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT, 100, 64, 'sha512').toString('hex');
}
function signJwt(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_VALIDITY });
}
function verifyJwt(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { hashPassword, signJwt, verifyJwt };

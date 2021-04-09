const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
const expires = process.env.JWT_EXPIRES_IN;

function toJWT(data) {
  return jwt.sign(data, jwtSecret, { expiresIn: expires });
}

function toData(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = { toJWT, toData };

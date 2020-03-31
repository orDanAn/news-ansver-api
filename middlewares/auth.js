const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/unauthorized_error');

const { jwtSecret } = require('../config/config');
const { messegUnauthorized } = require('../variables/variables');


module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : jwtSecret);
  } catch (e) {
    const err = new Unauthorized(messegUnauthorized);
    next(err);
  }
  req.user = payload;

  next();
};

const rateLimit = require('express-rate-limit');


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
});

module.exports = { apiLimiter };

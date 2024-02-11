/* eslint-disable no-undef */
const rateLimit = require('express-rate-limit');

module.exports.rateLimit = rateLimit({
  max: 100
})
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { ERROR_SERVER } = require('../utils/errorsStatus');

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = ERROR_SERVER, message } = err;

  res.status(statusCode).send({ message: statusCode === ERROR_SERVER ? 'Произошла ошибка' : message });
};

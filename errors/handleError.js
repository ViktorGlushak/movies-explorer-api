const { SERVER_ERROR, CAST_ERROR } = require('../utils/constants');

const handleError = (err, req, res, next) => {
  const { message } = err;
  let { statusCode = 500 } = err;
  if (err.name === CAST_ERROR) {
    statusCode = 400;
  }
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? SERVER_ERROR
        : message,
    });
  next();
};

module.exports = handleError;

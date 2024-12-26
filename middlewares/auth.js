const jwt = require('jsonwebtoken');
const { AUTHORIZATION_NEEDED } = require('../utils/constants');
const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError401 = require('../errors/unauthorizedError401');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError401(AUTHORIZATION_NEEDED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError401(AUTHORIZATION_NEEDED);
  }

  req.user = payload;

  next();
};

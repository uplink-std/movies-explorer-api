const jwt = require('jsonwebtoken');
const {
  JWT_SECRET, cookieKeys, publicRoutePaths, messages,
} = require('../utils/constants');
const { handleError } = require('../utils/errors');
const AuthError = require('../errors/auth-error');

function isPublicRoute(req) {
  const routePath = req.path;
  return publicRoutePaths.includes(routePath);
}

function handleProtectedRoute(req, res, next) {
  try {
    req.user = jwt.verify(req.cookies[cookieKeys.jwt], JWT_SECRET);
    next();
  } catch (error) {
    handleError(new AuthError(messages.UNAUTHORIZED), res, next);
  }
}

const authMiddleware = (req, res, next) => {
  if (isPublicRoute(req)) {
    next();
  } else {
    handleProtectedRoute(req, res, next);
  }
};

module.exports = { authMiddleware };

const jwt = require('jsonwebtoken');
const { JWT_SECRET, cookieKeys, publicRoutePaths } = require('../utils/constants');
const { handleError } = require('../utils/errors');
const AuthError = require('../errors/auth-error');
const { serverLogger } = require('../utils/logger');

function isPublicRoute(req) {
  const routePath = req.path;
  serverLogger.info(`routePath = '${routePath}`);
  return publicRoutePaths.includes(routePath);
}

function handleProtectedRoute(req, res, next) {
  try {
    req.user = jwt.verify(req.cookies[cookieKeys.jwt], JWT_SECRET);
    next();
  } catch (error) {
    handleError(new AuthError('Ошибка авторизации'), res, next);
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

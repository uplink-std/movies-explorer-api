const httpStatus = {
  ok: 200,
  created: 201,
  accepted: 202,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  serverError: 500,
};

const {
  JWT_SECRET = 'JWT_SECRET_KEY',
  PORT = 3000,
  CORS_CONFIG_ORIGIN = false,
  LOG_LEVEL = 'info',
} = process.env;

const cookieKeys = {
  jwt: 'MOVIES_EXPLORER_JWT',
};

module.exports = {
  httpStatus,
  JWT_SECRET,
  PORT,
  CORS_CONFIG_ORIGIN,
  LOG_LEVEL,
  cookieKeys,
};

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
  MONGODB_URL = 'mongodb://localhost:27017/moviesdb?authSource=admin',
  MONGO_USERNAME = '',
  MONGO_PASSWORD = '',
} = process.env;

const cookieKeys = {
  jwt: 'MOVIES_EXPLORER_JWT',
};

const publicRoutePaths = [
  '/signin',
  '/signup',
];

const messages = {
  UNAUTHORIZED_MOVIE_DELETE: 'Нельзя удалить фильм другого пользователя',
  RESOURCE_NOT_FOUND: 'Ресурс не найден',
  SIGNOUT_SUCCESSFULLY: 'Выполнен выход пользователя',
  UNAUTHORIZED: 'Требуется авторизация',
  SERVER_ERROR: 'Ошибка на стороне сервера',
  INVALID_URL: 'Нарушен формат адреса ресурса (URL)',
  INVALID_EMAIL: 'Нарушен формат адреса электронной почты',
  INVALID_CREDENTIALS: 'Неправильно указаны почта или пароль',
  DATABASE_ERROR: 'Ошибка при взаимодействии с базой данных',
  USER_EXISTS: 'Пользователь с таким адресом электронной почты уже зарегистрирован',
  APPLICATION_STARTED: 'Приложение запущено на порту:',

};

const URL_VALIDATOR_OPTIONS = {
  protocols: ['http', 'https'],
  require_protocol: true,
  require_valid_protocol: true,
  allow_protocol_relative_urls: false,
};

module.exports = {
  httpStatus,
  JWT_SECRET,
  PORT,
  CORS_CONFIG_ORIGIN,
  LOG_LEVEL,
  cookieKeys,
  MONGODB_URL,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  publicRoutePaths,
  messages,
  URL_VALIDATOR_OPTIONS,
};

require('dotenv').config();

const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { CORS_CONFIG_ORIGIN } = require('./utils/constants');
const moviesRoute = require('./routes/movies');
const usersRoute = require('./routes/users');
const NotFoundError = require('./errors/not-found-error');
const { handleError } = require('./utils/errors');
const { authMiddleware } = require('./middlewares/auth');
const { emailValidator, nameValidator, passwordValidator } = require('./utils/joi-validation');
const { createUser, login, logout } = require('./controllers/users');
const { errorMiddleware } = require('./middlewares/error');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors({
  origin: CORS_CONFIG_ORIGIN,
  credentials: true,
}));

app.set('trust proxy', 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: emailValidator.required(),
      name: nameValidator.required(),
      password: passwordValidator.required(),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: emailValidator.required(),
      password: passwordValidator.required(),
    }),
  }),
  login,
);

app.use(authMiddleware);

app.post(
  '/signout',
  logout,
);

app.use('/users', usersRoute);
app.use('/movies', moviesRoute);

app.use((req, res, next) => handleError(new NotFoundError(`Ресурс не найден: ${req.originalUrl}`), res, next));
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

mongoose.set('runValidators', true);

module.exports = app;

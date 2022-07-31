require('dotenv').config();

const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { CORS_CONFIG_ORIGIN } = require('./utils/constants');
const appRoutes = require('./routes/index');
const NotFoundError = require('./errors/not-found-error');
const { handleError } = require('./utils/errors');
const { authMiddleware } = require('./middlewares/auth');
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

app.use(authMiddleware);

app.use('/', appRoutes);

app.use((req, res, next) => handleError(new NotFoundError(`Ресурс не найден: ${req.originalUrl}`), res, next));
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

mongoose.set('runValidators', true);

module.exports = app;

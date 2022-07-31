const { CastError, ValidationError } = require('mongoose').Error;
const MoviesExplorerError = require('../errors/movies-explorer-error');
const ServerError = require('../errors/server-error');
const BadRequestError = require('../errors/bad-request-error');
const UserExistsError = require('../errors/user-exists-error');

const isNotMoviesExplorerError = (error) => !(error instanceof MoviesExplorerError);

const makeFromMongodbError = (error) => {
  if (error.code === 11000) {
    return new UserExistsError('Пользователь с таким адресом электронной почты уже зарегистрирован');
  }
  return new ServerError(`Ошибка при взаимодействии с базой данных: ${error.message}`);
};

const makeMoviesExplorerError = (error) => {
  if (error instanceof CastError
    || error instanceof ValidationError) {
    return new BadRequestError(error.message);
  }
  if (error.name === 'MongoServerError') {
    return makeFromMongodbError(error);
  }
  return new ServerError('Ошибка на стороне сервера.');
};

const handleError = (err, res, next) => {
  let error = err;
  if (isNotMoviesExplorerError(err)) {
    error = makeMoviesExplorerError(err);
  }

  next(error);
};

module.exports = { handleError };

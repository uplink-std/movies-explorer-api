const ServerError = require('../errors/server-error');
const MoviesExplorerError = require('../errors/movies-explorer-error');

function isNotMoviesExplorerError(error) {
  return !(error instanceof MoviesExplorerError);
}

const errorMiddleware = (err, req, res, next) => {
  let error = err;
  if (isNotMoviesExplorerError(err)) {
    error = new ServerError('Ошибка на стороне сервера.');
  }
  res.status(error.statusCode || 500);
  res.send({ message: error.message });
  next();
};

module.exports = { errorMiddleware };

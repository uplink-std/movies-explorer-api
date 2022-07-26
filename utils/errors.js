const MoviesExplorerError = require('../errors/movies-explorer-error');
const ServerError = require('../errors/server-error');

const isNotMoviesExplorerError = (error) => !(error instanceof MoviesExplorerError);

const makeMoviesExplorerError = () => new ServerError('Ошибка на стороне сервера.');

const handleError = (err, res, next) => {
  let error = err;
  if (isNotMoviesExplorerError(err)) {
    error = makeMoviesExplorerError();
  }

  next(error);
};

module.exports = { handleError };

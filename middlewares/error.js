const ServerError = require('../errors/server-error');
const MoviesExplorerError = require('../errors/movies-explorer-error');
const { messages } = require('../utils/constants');

function isNotMoviesExplorerError(error) {
  return !(error instanceof MoviesExplorerError);
}

const errorMiddleware = (err, req, res, next) => {
  let error = err;
  if (isNotMoviesExplorerError(err)) {
    error = new ServerError(messages.SERVER_ERROR);
  }
  res.status(error.statusCode || 500);
  res.send({ message: error.message });
  next();
};

module.exports = { errorMiddleware };

const { httpStatus } = require('../utils/constants');
const MoviesExplorerError = require('./movies-explorer-error');

class NotFoundError extends MoviesExplorerError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.notFound;
  }
}

module.exports = NotFoundError;

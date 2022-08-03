const { httpStatus } = require('../utils/constants');
const MoviesExplorerError = require('./movies-explorer-error');

class BadRequestError extends MoviesExplorerError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.badRequest;
  }
}

module.exports = BadRequestError;

const { httpStatus } = require('../utils/constants');
const MoviesExplorerError = require('./movies-explorer-error');

class ForbiddenError extends MoviesExplorerError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.forbidden;
  }
}

module.exports = ForbiddenError;

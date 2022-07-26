const { httpStatus } = require('../utils/constants');

class MoviesExplorerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.serverError;
  }
}

module.exports = MoviesExplorerError;

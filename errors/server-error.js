const { httpStatus } = require('../utils/constants');
const MoviesExplorerError = require('./movies-explorer-error');

class ServerError extends MoviesExplorerError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.serverError;
  }
}

module.exports = ServerError;

const { httpStatus } = require('../utils/constants');
const MoviesExplorerError = require('./movies-explorer-error');

class AuthError extends MoviesExplorerError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.unauthorized;
  }
}

module.exports = AuthError;

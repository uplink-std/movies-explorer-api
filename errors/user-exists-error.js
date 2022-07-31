const { httpStatus } = require('../utils/constants');
const MoviesExplorerError = require('./movies-explorer-error');

class UserExistsError extends MoviesExplorerError {
  constructor(message) {
    super(message);
    this.statusCode = httpStatus.conflict;
  }
}

module.exports = UserExistsError;

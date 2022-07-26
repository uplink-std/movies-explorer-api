const { httpStatus } = require('../utils/constants');

const getMovies = (req, res) => {
  res.status(httpStatus.ok).send([]);
};

module.exports = { getMovies };

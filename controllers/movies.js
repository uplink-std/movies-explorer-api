const Movie = require('../models/movie');
const { httpStatus, messages } = require('../utils/constants');
const { handleError } = require('../utils/errors');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(httpStatus.ok).send(movies))
    .catch((error) => handleError(error, res, next));
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.status(httpStatus.created).send(movie))
    .catch((error) => handleError(error, res, next));
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => new NotFoundError(messages.RESOURCE_NOT_FOUND))
    .then((movie) => {
      if (String(movie.owner._id) !== String(req.user._id)) {
        throw new ForbiddenError(messages.UNAUTHORIZED_MOVIE_DELETE);
      }
      return movie.remove();
    })
    .then((movie) => res.status(httpStatus.ok).send(movie))
    .catch((error) => handleError(error, res, next));
};

module.exports = { getMovies, createMovie, deleteMovie };

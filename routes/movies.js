const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie } = require('../controllers/movies');
const {
  idValidator, urlValidator,
} = require('../utils/joi-validation');

router.get('/', getMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: urlValidator.required(),
      trailerLink: urlValidator.required(),
      thumbnail: urlValidator.required(),
      owner: idValidator.required(),
      movieId: idValidator.required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: idValidator.required(),
    }),
  }),
  createMovie,
);

module.exports = router;

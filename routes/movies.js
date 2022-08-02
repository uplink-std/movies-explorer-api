const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const {
  joiUrlValidator, joiIdValidator,
} = require('../utils/validation');

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
      image: joiUrlValidator.required(),
      trailerLink: joiUrlValidator.required(),
      thumbnail: joiUrlValidator.required(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);
router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: joiIdValidator.required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;

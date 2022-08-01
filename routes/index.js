const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { joiEmailValidator, joiNameValidator, joiPasswordValidator } = require('../utils/validation');
const { createUser, login, logout } = require('../controllers/users');
const usersRoute = require('./users');
const moviesRoute = require('./movies');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: joiEmailValidator.required(),
      name: joiNameValidator.required(),
      password: joiPasswordValidator.required(),
    }),
  }),
  createUser,
);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: joiEmailValidator.required(),
      password: joiPasswordValidator.required(),
    }),
  }),
  login,
);

router.post(
  '/signout',
  logout,
);

router.use('/users', usersRoute);
router.use('/movies', moviesRoute);

module.exports = router;

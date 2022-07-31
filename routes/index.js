const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { emailValidator, nameValidator, passwordValidator } = require('../utils/joi-validation');
const { createUser, login, logout } = require('../controllers/users');
const usersRoute = require('./users');
const moviesRoute = require('./movies');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: emailValidator.required(),
      name: nameValidator.required(),
      password: passwordValidator.required(),
    }),
  }),
  createUser,
);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: emailValidator.required(),
      password: passwordValidator.required(),
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

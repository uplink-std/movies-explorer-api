const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUser,
  getLoggedUser,
} = require('../controllers/users');

const {
  nameValidator,
  emailValidator,
} = require('../utils/joi-validation');

router.get('/me', getLoggedUser);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: nameValidator.required(),
      email: emailValidator.required(),
    }),
  }),
  updateUser,
);

module.exports = router;

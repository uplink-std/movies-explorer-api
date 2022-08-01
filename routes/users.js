const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUser,
  getLoggedUser,
} = require('../controllers/users');

const {
  joiNameValidator,
  joiEmailValidator,
} = require('../utils/validation');

router.get('/me', getLoggedUser);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: joiNameValidator.required(),
      email: joiEmailValidator.required(),
    }),
  }),
  updateUser,
);

module.exports = router;

const { Joi } = require('celebrate');

const emailValidator = Joi.string().email();

const passwordValidator = Joi.string().min(2);

const nameValidator = Joi.string().min(2).max(30);

const urlValidator = Joi.string().uri();

const idValidator = Joi.string().hex().length(24);

module.exports = {
  emailValidator,
  passwordValidator,
  nameValidator,
  urlValidator,
  idValidator,
};

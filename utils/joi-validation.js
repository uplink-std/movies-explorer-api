const { Joi } = require('celebrate');
const validator = require('validator');
const { URL_VALIDATOR_OPTIONS, messages } = require('./constants');

const emailValidator = Joi.string().email();

const passwordValidator = Joi.string().min(2);

const nameValidator = Joi.string().min(2).max(30);

const urlValidator = Joi.string().custom((value, helper) => {
  if (validator.isURL(value, URL_VALIDATOR_OPTIONS)) {
    return true;
  }
  return helper.message(messages.INVALID_URL);
});

const idValidator = Joi.string().hex().length(24);

module.exports = {
  emailValidator,
  passwordValidator,
  nameValidator,
  urlValidator,
  idValidator,
};

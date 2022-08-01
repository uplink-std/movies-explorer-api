const { Joi } = require('celebrate');
const validator = require('validator');
const { URL_VALIDATOR_OPTIONS, messages } = require('./constants');

const isValidUrl = (value) => validator.isURL(value, URL_VALIDATOR_OPTIONS);
const isValidEmail = (value) => validator.isEmail(value);

const joiEmailValidator = Joi.string().custom(
  (value, helper) => (isValidEmail(value) ? true : helper.message(messages.INVALID_EMAIL)),
);

const joiPasswordValidator = Joi.string().min(2);

const joiNameValidator = Joi.string().min(2).max(30);

const joiUrlValidator = Joi.string().custom(
  (value, helper) => (isValidUrl(value) ? true : helper.message(messages.INVALID_URL)),
);

const joiIdValidator = Joi.string().hex().length(24);

const mongoUrlValidator = {
  validator: isValidUrl,
  message: () => messages.INVALID_URL,
};

const mongoEmailValidator = {
  validator: isValidEmail,
  message: () => messages.INVALID_EMAIL,
};

module.exports = {
  joiEmailValidator,
  joiPasswordValidator,
  joiNameValidator,
  joiUrlValidator,
  joiIdValidator,
  mongoUrlValidator,
  mongoEmailValidator,
};

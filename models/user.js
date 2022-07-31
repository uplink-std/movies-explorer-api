const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { emailValidator } = require('../utils/joi-validation');
const AuthError = require('../errors/auth-error');
const { messages } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (emailInput) => emailValidator.validate(emailInput).error === undefined,
      message: () => messages.INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.getPasswordHash = function getPasswordHash(password) {
  return bcrypt.hash(password, 10);
};

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(messages.INVALID_CREDENTIALS));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError(messages.INVALID_CREDENTIALS));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

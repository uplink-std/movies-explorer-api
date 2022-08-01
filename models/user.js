const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { mongoEmailValidator } = require('../utils/validation');
const AuthError = require('../errors/auth-error');
const { serverLogger } = require('../utils/logger');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: mongoEmailValidator,
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
  serverLogger.info(`email: ${email}`);
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('messages.INVALID_CREDENTIALS1'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('messages.INVALID_CREDENTIALS2'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

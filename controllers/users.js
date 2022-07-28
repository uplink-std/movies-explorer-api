const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { handleNotFound, handleError } = require('../utils/errors');
const { httpStatus, JWT_SECRET, cookieKeys } = require('../utils/constants');

function getPasswordHash(password) {
  return bcrypt.hash(password, 10);
}

function generateJwtToken(userId) {
  return jwt.sign(
    { _id: userId },
    JWT_SECRET,
    { expiresIn: '7d' },
  );
}

const getLoggedUser = (req, res, next) => {
  User.findById(req.user._id)
    .then(handleNotFound)
    .then((user) => res.status(httpStatus.ok).send(user))
    .catch((error) => handleError(error, res, next));
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  getPasswordHash(password)
    .then((passwordHash) => User.create({
      name,
      email,
      password: passwordHash,
    }))
    .then((user) => {
      const userResponse = Object.assign(user);
      userResponse.password = undefined;
      res.status(httpStatus.created).send(userResponse);
    })
    .catch((error) => handleError(error, res, next));
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, email }, { new: true })
    .then(handleNotFound)
    .then((user) => res.status(httpStatus.ok).send(user))
    .catch((error) => handleError(error, res, next));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateJwtToken(user._id);
      res.cookie(cookieKeys.jwt, token, {
        maxAge: 3600000,
        httpOnly: true,
      })
        .send({ _id: user._id, email: user.email });
    })
    .catch((error) => handleError(error, res, next));
};

const logout = (req, res) => {
  res.clearCookie(cookieKeys.jwt);
  return res.status(httpStatus.ok).send({ message: 'Выполнен выход пользователя' });
};

module.exports = {
  getLoggedUser,
  updateUser,
  createUser,
  login,
  logout,
};

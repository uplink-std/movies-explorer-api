const mongoose = require('mongoose');
const { urlValidator } = require('../utils/joi-validation');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (urlInput) => urlValidator.validate(urlInput).error === undefined,
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (urlInput) => urlValidator.validate(urlInput).error === undefined,
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (urlInput) => urlValidator.validate(urlInput).error === undefined,
      message: (props) => `${props.value} is not a valid url!`,
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

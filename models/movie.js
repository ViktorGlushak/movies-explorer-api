const mongoose = require('mongoose');
const validator = require('validator');
const { FIELD_MUST_BE_FILLED, INCORRECT_URL } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    required: [true, FIELD_MUST_BE_FILLED.replace("$field", "country")],
    type: String,
  },
  director: {
    required: [true, FIELD_MUST_BE_FILLED.replace("$field", "director")],
    type: String,
  },
  duration: {
    required: [true, FIELD_MUST_BE_FILLED.replace("$field", "duration")],
    type: Number,
  },
  year: {
    required: [true, FIELD_MUST_BE_FILLED.replace("$field", "year")],
    type: String,
  },
  description: {
     required: [true, FIELD_MUST_BE_FILLED.replace("$field", "description")],
    type: String,
  },
  image: {
     required: [true, FIELD_MUST_BE_FILLED.replace("$field", "image")],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: INCORRECT_URL,
    },
  },
  trailerLink: {
     required: [true, FIELD_MUST_BE_FILLED.replace("$field", "trailerLink")],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: INCORRECT_URL,
    },
  },
  thumbnail: {
     required: [true, FIELD_MUST_BE_FILLED.replace("$field", "thumbnail")],
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: INCORRECT_URL,
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: [true, FIELD_MUST_BE_FILLED.replace("$field", "owner")],
  },
  movieId: {
    type: Number,
    required: [true, FIELD_MUST_BE_FILLED.replace("$field", "movieId")],
  },
  nameRU: {
    type: String,
    required: [true, FIELD_MUST_BE_FILLED.replace("$field", "nameRU")],
  },
    nameEN: {
    type: String,
    required: [true, FIELD_MUST_BE_FILLED.replace("$field", "nameEN")],
  },
}, { versionKey: false });


module.exports = mongoose.model('movie', movieSchema);

/* eslint-disable no-undef */
const mongoose = require('mongoose');
const { URLRegExpression } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country : {
    type: String,
    required: {
      value: true,
    },
  },
  director : {
    type: String,
    required: {
      value: true,
    },
  },
  duration : {
    type: Number,
    required: {
      value: true,
    },
  },
  year : {
    type: String,
    required: {
      value: true,
    },
  },
  description : {
    type: String,
    required: {
      value: true,
    },
  },
  image : {
    type: String,
    match: [URLRegExpression, 'Некорректная ссылка']
  },
  trailerLink : {
    type: String,
    match: [URLRegExpression, 'Некорректная ссылка']
  },
  thumbnail : {
    type: String,
    match: [URLRegExpression, 'Некорректная ссылка']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: {
      value: true,
      message: 'Поле name является обязательным',
    },
  },
  movieId : {
    type: Number,
    required: {
      value: true,
    },
  },
  nameRU  : {
    type: String,
    required: {
      value: true,
    },
  },
  nameEN : {
    type: String,
    required: {
      value: true,
    },
  },
})

  module.exports = mongoose.model('movie', movieSchema);
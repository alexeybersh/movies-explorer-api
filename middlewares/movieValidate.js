/* eslint-disable no-undef */
const { celebrate, Joi } = require('celebrate');
const { URLRegExpression } = require('../utils/constants');

module.exports.movieValidateId = (celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).alphanum(),
  }),
}));

module.exports.movieValidateCreate = (celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(new RegExp(URLRegExpression)),
    trailerLink: Joi.string().required().pattern(new RegExp(URLRegExpression)),
    thumbnail: Joi.string().required().pattern(new RegExp(URLRegExpression)),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required()
  }),
}));

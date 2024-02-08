/* eslint-disable no-undef */
const Movie = require('../models/movie');

const { errorMessage } = require('../utils/errorsMessage');

const { STATUS_OK, CREATED } = require('../utils/errorsStatus');

module.exports.createMovie = ((req, res, next) => {

  owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((movie) => res.status(CREATED).send( movie))
    .catch((error) => {
      next(errorMessage(error));
    });
});

module.exports.getMovies = ((req, res, next) => {
  Movie.find({})
    .then((movie) => res.status(STATUS_OK).send({ movie }))
    .catch((error) => {
      next(errorMessage(error, 'movie'));
    });
});

module.exports.deleteMovie = ((req, res, next) => {
  console.log(req.params.movieId, req.user._id);
  Movie.findOne({ movieId: 353264573485 }).orFail()
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new Error('Удаление не своего фильма');
      }
      Movie.deleteOne({ movieId: req.params.movieId }).orFail()
        .then(() => res.status(STATUS_OK).send({ message: ' Фильм удалён!' }));
    })
    .catch((error) => {
      next(errorMessage(error));
    });
});
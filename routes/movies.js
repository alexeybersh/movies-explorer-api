/* eslint-disable no-undef */
const { Router } = require('express');

const { movieValidateCreate } = require('../middlewares/movieValidate');

const {
  createMovie, getMovies, deleteMovie
} = require('../controllers/movies');

const movieRouter = Router();

movieRouter.get('/', getMovies);

movieRouter.post('/', movieValidateCreate, createMovie);

movieRouter.delete('/:movieId', deleteMovie);

module.exports = movieRouter;

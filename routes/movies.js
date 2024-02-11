/* eslint-disable no-undef */
const { Router } = require('express');

const { movieValidateCreate, movieValidateId } = require('../middlewares/movieValidate');

const {
  createMovie, getMovies, deleteMovie
} = require('../controllers/movies');

const movieRouter = Router();

movieRouter.get('/', getMovies);

movieRouter.post('/', movieValidateCreate, createMovie);

movieRouter.delete('/:id', movieValidateId, deleteMovie);

module.exports = movieRouter;

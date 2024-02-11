/* eslint-disable no-undef */
const { Router } = require('express');

const { errorMessage } = require('../utils/errorsMessage');
const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { userValidateAuth } = require('../middlewares/userValidate');
const userRouter = require('./users');
const movieRouter = require('./movies');

const router = Router();

router.post('/signin', userValidateAuth, login);

router.post('/signup', userValidateAuth, createUser);

router.use('/users', auth, userRouter);

router.use('/movies', auth, movieRouter);

router.use('*', auth, (req, res, next) => next(errorMessage({ name: 'PageNotFound' })));

module.exports = router;

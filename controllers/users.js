/* eslint-disable no-undef */
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { genToken } = require('../utils/jwt');
const { errorMessage } = require('../utils/errorsMessage');

const { STATUS_OK, CREATED } = require('../utils/errorsStatus');

module.exports.createUser = ((req, res, next) => {
  const { password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      ...req.body,
      password: hash,
    }))
    .then((user) => res.status(CREATED).send({
      _id: user._id, email: user.email, name: user.name,
    }))
    .catch((error) => {
      next(errorMessage(error));
    });
});


module.exports.getUser = ((req, res, next) => {
  User.findById(req.user._id).orFail()
    .then((user) => res.status(STATUS_OK).send({ user }))
    .catch((error) => {
      next(errorMessage(error));
    });
});

module.exports.patchUser = ((req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  }).orFail()
    .then((user) => res.status(STATUS_OK).send({ user }))
    .catch((error) => {
      next(errorMessage(error, 'user'));
    });
});

module.exports.login = ((req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      res.status(STATUS_OK).send({ token: genToken({ _id: user._id }) });
    })
    .catch((error) => {
      next(errorMessage(error));
    });
});

/* eslint-disable no-undef */
const { Router } = require('express');

const {userValidateInfo } = require('../middlewares/userValidate');

const {
  getUser, patchUser,
} = require('../controllers/users');

const userRouter = Router();

userRouter.get('/me', getUser);

userRouter.patch('/me', userValidateInfo, patchUser);

module.exports = userRouter;

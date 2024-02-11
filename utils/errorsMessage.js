/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
const { MongoServerError } = require('mongodb');

const {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  ERROR_SERVER,
  ERROR_CODE_DUPLICATE_MONGO,
} = require('./errorsStatus');

module.exports.errorMessage = (error) => {
  if (error.name === 'ValidationError') {
    return err = { statusCode: BAD_REQUEST, message: 'Ошибка валидации полей' };
  } if (error instanceof MongoServerError || error.code === ERROR_CODE_DUPLICATE_MONGO) {
    return err = { statusCode: CONFLICT, message: 'Пользователь уже существует!' };
  } if (error.name === 'CastError') {
    return err = { statusCode: BAD_REQUEST, message: 'Передан не валидный id!' };
  } if (error.name === 'DocumentNotFoundError') {
    return err = { statusCode: NOT_FOUND, message: 'Пользователь не найден!' };
  } if (error.name === 'PageNotFound') {
    return err = { statusCode: NOT_FOUND, message: 'Запрашиваемый ресурс не найден' };
  } if (error.message === 'Фильмы не найдены!') {
    return err = { statusCode: UNAUTHORIZED, message: 'Фильмы не найдены!' };
  } if (error.message === 'Неправильные почта или пароль') {
    return err = { statusCode: UNAUTHORIZED, message: 'Неправильные почта или пароль!' };
  } if (error.message === 'Удаление не своего фильма') {
    return err = { statusCode: FORBIDDEN, message: 'Нельзя удалять фильм других пользователей' };
  } if (error.message === 'Необходима авторизация') {
    return err = { statusCode: UNAUTHORIZED, message: 'Необходима авторизация' };
  }
  return err = { statusCode: ERROR_SERVER, message: 'Произошла ошибка' };
};

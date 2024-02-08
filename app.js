/* eslint-disable no-undef */
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const { errors } = require('celebrate');
const { connect } = require('mongoose');
const router = require('./routes');
const { errorHandler } = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(cors());

app.use(requestLogger);

app.use(
  rateLimit({
    max: 100,
  }),
);

app.use(helmet());

connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listener on port ${PORT}`);
});

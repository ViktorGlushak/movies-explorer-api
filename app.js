require('dotenv').config();
const { NODE_ENV, DB_PROD, DB_DEV } = process.env;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/limiter');
const routers = require('./routes');
const handleError = require('./errors/handleError');

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(NODE_ENV === 'production' ? DB_PROD : DB_DEV);

app.use(limiter);
app.use(requestLogger);
app.use(cors());
app.use(routers);
app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(3000);

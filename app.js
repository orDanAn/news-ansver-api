require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const helmet = require('helmet');

const { errors } = require('celebrate');

const cors = require('cors');

const { corsOptions } = require('./config/cors/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const error = require('./middlewares/error');

const router = require('./routes/index');

const { NODE_ENV, MONGO_DB } = process.env;

const { mongoDb } = require('./config/config');

const { PORT = 3000 } = process.env;

const app = express();


app.use(cors(corsOptions));
app.options('*', cors());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB : mongoDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,

});

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(PORT, () => {
  console.log(`Слушаю порт API-news ${PORT}`);
});

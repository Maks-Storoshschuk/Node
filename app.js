const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const startCron = require('./cron');
const {config} = require('./config');
const {Errors, ErrorBuilder} = require('./errorHandler');
const {userRouter, authRouter} = require('./routes');
const createAdmin = require('./util/default-data.util');

const app = express();

mongoose.connect(config.MongoConnectUrl);

app.use(helmet());
app.use(cors({origin: _configureCors}));
app.use(rateLimit({
    widowMs: 15 * 60 * 1000,
    max: 100
}));

if (config.NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', authRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || Errors.err500.code)
        .json({
            message: err.message || Errors.err500.message
        });
});

app.listen(config.PORT, () => {
    console.log('app listen', config.PORT);
    createAdmin();
    startCron();
});

function _configureCors(origin, callback) {
    if (config.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = config.ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(ErrorBuilder(Errors.err290), false);
    }

    return callback(null, true);
}

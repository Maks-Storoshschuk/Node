const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const swagerUi = require('swagger-ui-express');
require('dotenv').config();

const {config} = require('./config');
const createAdmin = require('./util/default-data.util');
const {Errors, ErrorBuilder} = require('./errorHandler');
const startCron = require('./cron');
const swaggerJson = require('./docs/swagger.json');
const {userRouter, authRouter} = require('./routes');

const app = express();

mongoose.connect(config.MongoConnectUrl);

app.use(cors({origin: _configureCors}));
app.use(helmet());
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

app.use('/auth', authRouter);
app.use('/docs', swagerUi.serve, swagerUi.setup(swaggerJson));
app.use('/users', userRouter);
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

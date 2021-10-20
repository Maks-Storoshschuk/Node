const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const {config} = require('./config');
const {Errors} = require('./errorHandler');
const {userRouter, authRouter} = require('./routes');

const app = express();

mongoose.connect(config.MongoConnectUrl);

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
});


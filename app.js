const express = require('express');
const mongoose = require('mongoose');

const {MongoConnectUrl, PORT} = require('./config/config');
const userRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.route');

const app = express();

mongoose.connect(MongoConnectUrl);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log('app listen', PORT);
});


const express= require('express');
const mongoose = require('mongoose');

const {MongoConnectUrl, PORT} = require('./config/config');
const userRouter = require('./routes/user.router');

const app = express();

mongoose.connect(MongoConnectUrl);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/users',userRouter);

app.listen(PORT,()=>{
    console.log('app listen',PORT);
});


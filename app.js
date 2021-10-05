const express= require('express');

const app = express();

const userRouter = require('./routes/user.router');

app.use('/users',userRouter);

app.listen(5000,()=>{
    console.log('app listen 5000');
});
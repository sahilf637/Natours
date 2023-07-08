const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv')
const AppError = require('./utils/appError')
const tourRouter = require('./routes/tourRoute')
const userRouter = require('./routes/userRoute')
const globalErrorHandler = require('./Controller/errorController')

const app = express();
dotenv.config({ path: './config.env'}); 

//MIDDLEWARES

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}                                                   //3rd party middleware :- give information about the different request

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.header);
    next();
})

app.use(express.json());
app.use(express.static(`${__dirname}/public`));      //  express.jon is a middleware that can moddify the incoming data


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);               //mounting a new router on a route

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler);

module.exports = app;
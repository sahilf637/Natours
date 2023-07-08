const AppError = require("../utils/appError")
const lodash = require("lodash");

const handleCastError = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400)
}

const handleDuplicateFields = err => {
    // const value = err.KeyPattern.name.match(/(["'])(?:\\.|[^\\])*?\1/);
    const message = `Duplicate fields value: ${err.keyValue.name}. Please use another value!`;
    return new AppError(message, 400);
}

const handleValidationError = err => {
    const mess = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data:- ${mess.join('. ')}`; 
    return new AppError(message, 400)
}

const handleJWTError = new AppError('Invalid token. Please log in again', 401) 

const handleJWTExpiredError =  new AppError('Your Token has EXpired. Please log in again', 401) 

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error : err,
        message: err.message,
        stack : err.stack
    })
}

const sendErrPro = (err, res) => {
    // operational, trusted error: send message to client
    if(err.isOperational){
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
    //programming oer unknown error
} else {
    //send error to client
    res.status(500).json({
        status: 'error',
        message: 'something went really wrong!'
    })
  }
}


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    if(process.env.NODE_ENV === 'development'){
    sendErrorDev(err, res);
} else if(process.env.NODE_ENV = 'production'){
    let error = JSON.parse(JSON.stringify(err));

    if(error.name === 'CastError') error = handleCastError(error);

    if(error.code === 11000) error = handleDuplicateFields(error);

    if(error.name == 'ValidationError')  error = handleValidationError(error);

    if(error.name === 'JsonwebTokenError') handleJWTError();

    if(error.name === 'TokenExpiredError') handleJWTExpiredError();
    
    sendErrPro(error, res);
}
}
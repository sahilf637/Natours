const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoute')
const userRouter = require('./routes/userRoute')


const app = express();

//MIDDLEWARES

app.use(morgan('dev'))             //3rd party middleware :- give information about the different request

app.use(express.json());        //  express.jon is a middleware that can moddify the incoming data
 
// app.use(( req, res, next) => {
//     console.log('hello there');
//     next();                          //has to use next in order for the cycle to proceed   
// })



// //GET REQUEST

// app.get('/api/v1/tours', getalltour)

// app.get('/api/v1/tours/:id', getatour)

// //POST REQUEST

// app.post('/api/v1/tours', addatour )

// //PATCH REQUEST
// app.patch('/api/v1/tours/:id', updateatour)

// //DELETE REQUEST
// app.delete('/api/v1/tours/:id', deleteatour)

// app.route('/api/v1/tours').get(getalltour).post(addatour);

// app.route('/api/v1/tours/:id').get(getatour).patch(updateatour).delete(deleteatour); 



app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);               //mounting a new router on a route



module.exports = app;
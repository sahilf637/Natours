const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env'});     //loads config environemnt variables to process variables

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD); 

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con=>{
    console.log('DB connection successful!')
})



// const testTour = new Tour({
//     name: 'The Park Camper',
//     rating: 4.7,
//     price: 405
// });

// testTour.save().then(doc => {
//     console.log(doc);
// }).catch(err => {
//     console.log('ERROR :', err);
// })

app.listen( 3000, ()=> {
    console.log('App running on port 3000');
})
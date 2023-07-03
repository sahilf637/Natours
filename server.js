const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'});     //loads config environemnt variables to process variables

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD); 
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connection successful!')
})

app.listen( 3000, ()=> {
    console.log('App running on port 3000');
})
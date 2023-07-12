const fs = require('fs')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require("./../../models/tourModel");
const { log } = require('console');

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

//file reading
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

//IMPORT DATA INTO DATA BASE

const import_data = async () => {
    try {
      await Tour.create(tours);
      console.log("data has been added");
    } catch (err) {
      console.log(err);
    }
} 

//Deleting all data

const delete_data = async () => {
    try {
        await Tour.deleteMany();
        console.log("Data has been deleted");
    } catch (error) {
        console.log(error);
    }
}
if(process.argv[2] === '--import'){
    import_data();
    console.log("data successfully uploaded");
}
if(process.argv[2] === '--delete'){
    delete_data();
}
console.log(process.argv);
const express = require('express')
const Tour = require('./../models/tourModel');


// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// )

// exports.checkID = (req, res, next, val)=>{
//     if (req.params.id*1 > tours.length){
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }
//     next();
// }

exports.getalltour = (req, res)=>{
    console.log("In get");
    res.status(200).json({
        status: 'success',
        // results: tours.length,
        // data:{
        //     tours
        // }
    })
}


exports.getatour = (req,res) => {        //:id is an variable here
    console.log(req.params);            //holds all the id as an array
    const id = req.params.id * 1;
    // const tour = tours.find(ell => ell.id === id);
    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         tour
    //     }
    // })
}


exports.addatour =  async (req, res) => {           //express doesnt put data on req, we use middleware for it
   try{
    // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body);
    res.status(201).json({
        status:'success',
        data: {
            tour:newTour
        }
    })

   }catch(err){
    res.status(400).json({
        status: 'fail',
        message: err
    })
   }
}


exports.updateatour =  (req, res) => {
    res.status(200).json({
        status: 'status',
        data: {
            tour: 'updated'
        }
    })
}


 
exports.deleteatour =  (req, res)=>{
    res.status(204).json({                  //204 means no data to return
        status: 'success',
        data: null
    })
}

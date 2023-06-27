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

exports.getalltour = async (req, res)=>{
    try{
        const tours = await Tour.find();
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data:{
            tours
        }
    })

}   catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err 
        })
    }
}


exports.getatour = async (req,res) => {        //:id is an variable here
    try{
        const tours = await Tour.findById(req.params.id)  //findOne({_id: req.params.id})
        res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    })
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
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
        message: 'invalid data send'
    })
   }
}


exports.updateatour =  async (req, res) => {
    try {
        const tours = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,  //will sent back the newly updated data
            runValidators: true   //will again run validation for data
        })
        res.status(200).json({
            status: 'status',
            data: {
                tours
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}


 
exports.deleteatour = async (req, res)=>{
    try {
        const tours = await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({                  //204 means no data to return
            status: 'success',
            data: "deleted"
        })    
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

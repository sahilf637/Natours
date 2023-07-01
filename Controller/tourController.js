const express = require('express')
const Tour = require('./../models/tourModel');
const API_feature = require('./../utils/apifeatures')

//aliasing  
exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

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
        // execute Query
        const feature = new API_feature(Tour.find(), req.query)
        .filter()
        .sort()
        .limiting()
        .pagging();

        const tours = await feature.query;

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data:{
            tours
        }
    })

}catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
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
            data: null
        })    
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}


exports.getTourStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group:{
                    _id: { $toUpper: "$difficulty"},
                    numTours: { $sum: 1 },
                    NumRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: { avgPrice: 1 }
            },
            {
                $match: { _id: { $ne: 'EASY' } }
            }
        ])
        res.status(200).json({                  //204 means no data to return
            status: 'success',
            data: stats
        }) 
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getMonthlyPlan = async (req, res) => {
    try {
        const year = req.params.Year * 1;
        const Plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numOfTours: { $sum: 1 },
                    tours: { $push: '$name' }
                }
            },
            {
                $addFields: { Month : '$_id' }
            },
            {
                $project: { _id: 0 }
            },
            {
                $sort: { numOfTours: -1 }
            },
            {
                $limit: 12
            }
        ])

        res.status(200).json({
            status: 'success',
            data: Plan
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}
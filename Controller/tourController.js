const express = require('express')
const Tour = require('./../models/tourModel');
const API_feature = require('./../utils/apifeatures')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

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


exports.getalltour = catchAsync(async (req, res, next)=>{
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

}
)


exports.getatour = catchAsync(async (req,res, next) => {        //:id is an variable here
    const tours = await Tour.findById(req.params.id); //findOne({_id: req.params.id})
    if(!tours){
        return next( new AppError('No tour found with that ID', 404))
    }   
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    })
}
)


exports.addatour =  catchAsync(async (req, res, next) => {           //express doesnt put data on req, we use middleware for it
   // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body); 
    res.status(201).json({
        status:'success',
        data: {
            tour:newTour
        }
    })
})


exports.updateatour =  catchAsync(async (req, res, next) => {
    const tours = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,  //will sent back the newly updated data
        runValidators: true   //will again run validation for data
    })
    if(!tours){
        return next( new AppError('No tour found with that ID', 404))
    }
    res.status(200).json({
        status: 'status',
        data: {
            tours
        }
    })
}
)

 
exports.deleteatour = catchAsync(async (req, res, next)=>{
    const tours = await Tour.findByIdAndDelete(req.params.id)
    if(!tours){
        return next( new AppError('No tour found with that ID', 404))
    }    
    res.status(204).json({                  //204 means no data to return
            status: 'success',
            data: null
        })
}
)


exports.getTourStats = catchAsync(async (req, res, next) => {
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
}
)

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
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
}
)
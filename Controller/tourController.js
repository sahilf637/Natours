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
        //  Removing unwanted query
        const queryObj = {...req.query};
        const excludedField = ['page', 'sort', 'limit', 'fields'];
        excludedField.forEach(el => delete queryObj[el]);

        //advance filtering
        let querystr = JSON.stringify(queryObj);
        querystr = querystr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`); 
        
        // set Query
        let query = Tour.find(JSON.parse(querystr));

        //sort query
        if(req.query.sort){
            const sortby = req.query.sort.split(',').join(" ");
            query = query.sort(sortby);
        }
        else{
            query = query.sort('-createdAt');
        }

        //query limiting
        if(req.query.fields){
            const queryfield = req.query.fields.split(",").join(" ");
            query = query.select(queryfield)
        }
        else{
            query = query.select('-__v')  //- means excluding this field
        }
        //paging and limiting
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip  = (page - 1)*limit;

        //setting pagging
        query = query.skip(skip).limit(limit);
        
        if(req.query.page){
           const totaldocument = await Tour.countDocuments();
           if(skip >= totaldocument) throw new Error('this page does not exist')
        }

        // execute Query
        const tours = await query;

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

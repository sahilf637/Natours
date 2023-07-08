const { filter } = require('lodash');
const User = require('./../models/userModel')
const AppError = require('./../utils/appError')
const catchAsync = require('./../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    })
    return newObj;
}

exports.getalluser = catchAsync( async (req, res)=>{
const users = await User.find();

res.status(200).json({
    status: 'success',
    results: users.length,
    data:{
        users
    }
})
})

exports.getauser = (req,res) => {        //:id is an variable here
    res.status(500).json({
        message: "Route un defined"
    })
}

exports.addauser = (req, res) => {       //express doesnt put data on req, we use middleware for it
    res.status(500).json({
        message: "Route un defined"
    })
}

exports.updateauser =  (req, res) => {
    res.status(500).json({
        message: "Route un defined"
    })
}

exports.deleteauser =  (req, res)=>{
    res.status(500).json({
        message: "Route un defined"
    })
}


exports.updateMe =  catchAsync(async (req, res, next) => {
    //create error if user POSTs password data
    if(req.body.password || req.body.confirmPassword)
    return next(new AppError('This route is not for password updates. Please use /updateMyPassword', 400))

    //update user document
    const filterBody = filterObj(req.body, 'name', 'email');

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
        new: true,
        runValidators: true
    })     //since this time we only changing non compulassary field we ca use findbyidandupdate becuase it is not needed to run middleware
    res.status(200).json({
        status:'success',
        data:{
            user:updatedUser
        }
    })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(200).json({
        status:'success',
        data:null
    })
})
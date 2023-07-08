const express = require('express')
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync');

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

const express = require('express')

exports.getalluser = (req, res)=>{
    res.status(500).json({
        message: "Route un defined"
    })
}

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

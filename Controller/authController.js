const User = require('./../models/userModel')
const jwt = require('jsonwebtoken')
const catchAsync = require('./../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    console.log(process.env.JWT-SECRET);
    const token = jwt.sign({ id: newUser._id }, process.env.JWT-SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
})
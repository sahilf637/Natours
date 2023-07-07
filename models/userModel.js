const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide us your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please Provide a Password'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please conform your Password '],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Password are not same!!'
        }

    }
})

userSchema.pre('save', async function(next) {

    //only works if password is modified 
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,12)

    this.passwordConfirm = undefined;

    next;
})

const User = mongoose.model('User', userSchema);

module.exports = User;
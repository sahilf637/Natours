const express = require('express')
const userRouter = express.Router();
const authController = require('./../Controller/authController')
const userController = require('./../Controller/userController')

userRouter.route('/signup').post(authController.signup);

userRouter.route('/login').get(authController.login);

userRouter.route('/forgotPassword').get(authController.forgotPassword);

userRouter.route('/resetPassword/:token').patch(authController.resetPassword);

userRouter.route('/updateMyPassword').patch(authController.protect,authController.updatePassword);

userRouter.route('/').get(userController.getalluser).post(userController.addauser);

userRouter.route('/:id').get(userController.getauser).patch(userController.updateauser).delete(userController.deleteauser);

module.exports = userRouter;
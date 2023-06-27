const express = require('express')
const userRouter = express.Router();
const userController = require('./../Controller/userController')

userRouter.route('/').get(userController.getalluser).post(userController.addauser);

userRouter.route('/:id').get(userController.getauser).patch(userController.updateauser).delete(userController.deleteauser);

module.exports = userRouter;
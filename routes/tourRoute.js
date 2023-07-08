const express = require('express')
const tourController = require('./../Controller/tourController')
const authController = require('./../Controller/authController')

const tourRouter = express.Router();

// tourRouter.param('id',tourController.checkID)

tourRouter.route('/getTourStats').get(tourController.getTourStats);

tourRouter.route('/getMonthlyPlan/:Year').get(tourController.getMonthlyPlan);

tourRouter.route('/get-5-cheap').get(tourController.aliasTopTours, tourController.getalltour);

tourRouter.route('/').get(authController.protect, tourController.getalltour).post(tourController.addatour);

tourRouter.route('/:id').get(tourController.getatour).patch(tourController.updateatour).delete(authController.protect,authController.restrictTo('admin', 'lead-guide'),tourController.deleteatour); 

module.exports = tourRouter;
const express = require('express')
const tourController = require('./../Controller/tourController')


const tourRouter = express.Router();

// tourRouter.param('id',tourController.checkID)

tourRouter.route('/getTourStats').get(tourController.getTourStats);

tourRouter.route('/getMonthlyPlan/:Year').get(tourController.getMonthlyPlan);

tourRouter.route('/get-5-cheap').get(tourController.aliasTopTours, tourController.getalltour);

tourRouter.route('/').get(tourController.getalltour).post(tourController.addatour);

tourRouter.route('/:id').get(tourController.getatour).patch(tourController.updateatour).delete(tourController.deleteatour); 

module.exports = tourRouter;
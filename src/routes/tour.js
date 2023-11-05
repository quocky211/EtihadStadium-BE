const express = require('express');
const router = express.Router();
const tourController = require('../app/controllers/tourController');

router.get('/:paramName', tourController.getTourByParamName);
router.get('/:paramName/chooseTime', tourController.getTicketByTour);
router.get('/', tourController.getTours);


// book tour
router.post('/:paramName/chooseTime', tourController.getTicketByTour);

// // admin
router.post('/:paramName/add-tour-service', tourController.addTourService);
router.post('/:paramName/add-tour-detail', tourController.addTourDetail);
router.post('/add-tour', tourController.addTour);
router.delete('/:paramName', tourController.destroyTour);
router.patch('/:paramName', tourController.editTour);

module.exports = router;
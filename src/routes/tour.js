const express = require('express');
const router = express.Router();
const tourController = require('../app/controllers/tourController');

router.get('/:paramName', tourController.getTourByParamName);
router.get('/:paramName/chooseTime', tourController.getTicketByTour);
router.get('/', tourController.getTours);
router.post('/:paramName/chooseTime', tourController.getTicketByTour);


// book tour



// // admin
router.post('/add-tour-detail/:paramName', tourController.addTourDetail);
router.post('/add-tour', tourController.addTour);
router.delete('/:paramName', tourController.destroyTour);
router.patch('/:paramName', tourController.editTour);

module.exports = router;
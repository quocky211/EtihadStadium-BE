const express = require('express');
const router = express.Router();
const serviceController = require('../app/controllers/serviceController');

router.get('/:code', serviceController.getServiceByCode);
router.get('/', serviceController.getServices);

// // admin
router.post('/add-service', serviceController.addService);
router.delete('/:code', serviceController.destroyService);
router.patch('/:code', serviceController.editService);

module.exports = router;
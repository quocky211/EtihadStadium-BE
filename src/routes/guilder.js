const express = require('express');
const router = express.Router();
const guilderController = require('../app/controllers/guilderController');

router.get('/:paramName', guilderController.getGuilderByParamName);
router.get('/', guilderController.getGuilders);

// // admin
router.post('/add-Guilder', guilderController.addGuilder);
router.delete('/:paramName', guilderController.destroyGuilder);
router.patch('/:paramName', guilderController.editGuilder);

module.exports = router;
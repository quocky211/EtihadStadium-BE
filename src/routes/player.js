const express = require('express');
const router = express.Router();
const playerController = require('../app/controllers/playerController');

router.get('/:paramName', playerController.getPlayerByParamName);
router.get('/', playerController.getPlayers);

// // admin
router.post('/add-player', playerController.addPlayer);
router.delete('/:paramName', playerController.destroyPlayer);
router.patch('/:paramName', playerController.editPlayer);

module.exports = router;
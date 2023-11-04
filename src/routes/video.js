const express = require('express');
const router = express.Router();
const videoController = require('../app/controllers/videoController');

router.get('/:paramName', videoController.getVideoByParamName);
router.get('/', videoController.getVideos);

// // admin
router.post('/add-video', videoController.addVideo);
router.delete('/:paramName', videoController.destroyVideo);
router.patch('/:paramName', videoController.editVideo);

module.exports = router;
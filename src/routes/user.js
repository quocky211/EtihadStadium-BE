const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');
const { verifyAccessToken } = require('../app/helpers/jwt_service');

router.post('/register', userController.Register);
router.post('/refresh-token', userController.RefreshToken);
router.post('/login', userController.Login);
router.delete('/logout', userController.Logout);
router.get('/', userController.getUser);
router.patch('/:id', userController.EditUser);

module.exports = router;
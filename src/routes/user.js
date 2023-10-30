const express = require('express');
const  config = require('../app/config/config');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(config.development)
const User = require('../app/models/user')(sequelize, Sequelize);
const router = express.Router();
// const userController = require('../app/controllers/userController');
// router.post('/register', userController.Register);
// router.get('/verify-account', userController.VerifyAccount);
router.get('/', async (req, res) => {
    const userList =  await User.findAll({});
    return res.json(userList);
})

module.exports = router;
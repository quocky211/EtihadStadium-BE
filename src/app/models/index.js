const sequelize = require('../config/database');
const Tour = require('./tour');
const { DataTypes } = require('sequelize');
const Tour_detail = require('./tour_detail');
const models = {
    Tour: Tour(sequelize, DataTypes),
    Tour_detail: Tour_detail(sequelize, DataTypes),
}
models.Tour.hasMany(models.Tour_detail, { foreignKey: 'tourId', as: "tickets"});
models.Tour_detail.belongsTo(models.Tour, { foreignKey: 'tourId', as: "tour" })
module.exports = models;
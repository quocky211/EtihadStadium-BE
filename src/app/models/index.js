const sequelize = require('../config/database');
const Tour = require('./tour');
const { DataTypes } = require('sequelize');
const Tour_detail = require('./tour_detail');
const Tour_service = require('./tour_service');
const Service = require('./service');
const Tour_guilder = require('./tour_guilder');
const Guider = require("./guilder");
const Order = require("./order")
const models = {
    Tour: Tour(sequelize, DataTypes),
    Tour_detail: Tour_detail(sequelize, DataTypes),
    Tour_service: Tour_service(sequelize, DataTypes),
    Service: Service(sequelize, DataTypes),
    Guider: Guider(sequelize, DataTypes),
    Tour_guilder: Tour_guilder(sequelize, DataTypes),
    Order: Order(sequelize, DataTypes),
}
models.Tour.hasMany(models.Tour_detail, { foreignKey: 'tourId', as: "tickets"});
models.Tour_detail.belongsTo(models.Tour, { foreignKey: 'tourId', as: "tour" });

models.Tour.hasMany(models.Tour_service, { foreignKey: 'tourId', as: "tourService"});
models.Service.hasMany(models.Tour_service, { foreignKey: 'serviceId', as: "serviceTour"});
models.Tour_service.belongsTo(models.Tour, { foreignKey: 'tourId', as: "tour"});
models.Tour_service.belongsTo(models.Service, { foreignKey: 'serviceId', as: "service"});

models.Tour.hasMany(models.Tour_guilder, { foreignKey: 'tourId', as: "tourGuilder"});
models.Guider.hasMany(models.Tour_guilder, { foreignKey: 'guilderId', as: "guilderTour"});
models.Tour_guilder.belongsTo(models.Tour, { foreignKey: 'tourId', as: "tour"});
models.Tour_guilder.belongsTo(models.Guider, { foreignKey: 'guilderId', as: "guilder"});


module.exports = models;
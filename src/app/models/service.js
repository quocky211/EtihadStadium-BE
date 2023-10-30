'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.hasMany(models.Tour_service, { foreignKey: 'serviceId' });
    }
  }
  Service.init({
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    code: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour_service extends Model {
    static associate(models) {
      Tour_service.belongsTo(models.Tour, { foreignKey: 'tourId', as: 'tour' });
      Tour_service.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' });
    }
  }
  Tour_service.init({
    tourId: DataTypes.UUID,
    serviceId: DataTypes.UUID,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tour_service',
  });
  return Tour_service;
};
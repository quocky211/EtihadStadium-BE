'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    static associate(models) {
      Tour.hasMany(models.Tour_guilder,{ foreignKey: 'tourId' });
      Tour.hasMany(models.Tour_service,{ foreignKey: 'tourId' });
      Tour.hasMany(models.Tour_detail,{ foreignKey: 'tourId' });
    }
  }
  Tour.init({
    name: DataTypes.STRING,
    paramName: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    date: DataTypes.DATE,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tour',
  });
  return Tour;
};
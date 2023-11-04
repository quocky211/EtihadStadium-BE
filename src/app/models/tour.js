'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tour.hasMany(models.Tour_guilder,{ foreignKey: 'tourId' });
      Tour.hasMany(models.Tour_service,{ foreignKey: 'tourId' });
      Tour.hasMany(models.Order,{ foreignKey: 'tourId' });
    }
  }
  Tour.init({
    name: DataTypes.STRING,
    paramName: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    fromDate: DataTypes.DATE,
    toDate: DataTypes.DATE,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tour',
  });
  return Tour;
};
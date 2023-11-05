'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour_detail extends Model {
    static associate(models) {
      Tour_detail.belongsTo(models.Tour, { foreignKey: 'tourId', as: 'tourDetails' });
    }
  }
  Tour_detail.init({
    tourId: DataTypes.STRING,
    startAt: DataTypes.STRING,
    endAt: DataTypes.STRING,
    remainTicket: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tour_detail',
  });
  return Tour_detail;
};
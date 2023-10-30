'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    }
  }
  Ticket.init({
    orderId: DataTypes.UUID,
    code: DataTypes.STRING,
    nameOfVisitor: DataTypes.STRING,
    isUsed: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};
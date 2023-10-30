'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Tour, { foreignKey: 'tourId', as: 'tour' });
      Order.hasMany(models.Ticket, { foreignKey: 'orderId' });
    }
  }
  Order.init({
    tourId: DataTypes.UUID,
    ticketQuantity: DataTypes.INTEGER,
    customerId: DataTypes.UUID,
    totalAmount: DataTypes.DOUBLE,
    isCheckout: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
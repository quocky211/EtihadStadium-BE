'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: Sequelize.UUID
      },
      tourId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Tours',
          key: 'id'
        }
      },
      ticketQuantity: {
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.UUID
      },
      totalAmount: {
        type: Sequelize.DOUBLE
      },
      isCheckout: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
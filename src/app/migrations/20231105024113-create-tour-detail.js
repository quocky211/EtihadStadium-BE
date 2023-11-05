'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tour_details', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: Sequelize.UUID
      },
      tourId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Tours',
          key: 'id'
        }
      },
      startAt: {
        type: Sequelize.STRING
      },
      endAt: {
        type: Sequelize.STRING
      },
      remainTicket: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tour_details');
  }
};
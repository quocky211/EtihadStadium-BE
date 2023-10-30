'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tour_services', {
      tourId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'tours',
          key: 'id'
        }
      },
      serviceId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'services',
          key: 'id'
        }
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
    await queryInterface.dropTable('tour_services');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tour_guilders', {
      tourId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Tours',
          key: 'id'
        }
      },
      guilderId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Guilders',
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
    await queryInterface.dropTable('Tour_guilders');
  }
};
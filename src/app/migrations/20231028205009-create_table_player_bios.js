'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('player_bios', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      playerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'players',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('player_bios');
  }
};
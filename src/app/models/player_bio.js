'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player_bio extends Model {
    static associate(models) {
      Player_bio.belongsTo(models.Player, { foreignKey: 'playerId', as: 'player' });
    }
  }
  Player_bio.init({
    playerId: DataTypes.UUID,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Player_bio',
  });
  return Player_bio;
};
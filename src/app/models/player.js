'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Player.hasOne(models.Player_bio, { foreignKey: 'playerId' });
    }
  }
  Player.init({
    name: DataTypes.STRING,
    paramName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    location: DataTypes.DATE,
    nationality: DataTypes.STRING,
    position: DataTypes.STRING,
    joinedCity: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
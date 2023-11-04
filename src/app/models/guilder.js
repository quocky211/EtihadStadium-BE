'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guilder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Guilder.hasMany(models.Tour_guilder,{ foreignKey: 'guilderId' });
    }
  }
  Guilder.init({
    name: DataTypes.STRING,
    paramName: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Guilder',
  });
  return Guilder;
};
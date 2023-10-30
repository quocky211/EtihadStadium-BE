'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour_guilder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tour_guilder.belongsTo(models.Guilder,{ foreignKey: 'guilderId', as: 'guilder' });
      Tour_guilder.belongsTo(models.Tour,{ foreignKey: 'tourId', as: 'tour' });
    }
  }
  Tour_guilder.init({
    tourId: DataTypes.UUID,
    guilderId: DataTypes.UUID,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tour_guilder',
  });
  return Tour_guilder;
};
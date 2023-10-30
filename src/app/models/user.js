'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  //   static associate(models) {
  //     User.hasMany(models.Store, { foreignKey: 'store_id' });
  //     User.hasOne(models.Contract, { foreignKey: 'user_id' });
  //     User.hasMany(models.JobRequest, { foreignKey: 'user_id' });
  //   }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    avatar: DataTypes.STRING,
    gender: DataTypes.STRING,
    identifyCode: DataTypes.STRING,
    isVerify: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
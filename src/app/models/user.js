'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async isCheckPassword(password) {
      try {
        return await bcrypt.compare(password, this.password);
      } catch (error) {
      }
    }
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
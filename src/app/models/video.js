'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    
  }
  Video.init({
    name: DataTypes.STRING,
    paramName: DataTypes.STRING,
    linkIFrame: DataTypes.STRING,
    timeDuration: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    type: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};
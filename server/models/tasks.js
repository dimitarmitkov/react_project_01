'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tasks.init({
    taskName: DataTypes.STRING,
    taskType: DataTypes.ENUM('project', 'meeting'),
    taskProgress: DataTypes.ENUM('initial', 'selected', 'progress', 'review', 'done'),
    initiatedAt: DataTypes.DATE,
    initiatedByUserId: DataTypes.INTEGER,
    selectedAt: DataTypes.DATE,
    selectedByUserId: DataTypes.INTEGER,
    progressAt: DataTypes.DATE,
    progressByUserId: DataTypes.INTEGER,
    reviewAt: DataTypes.DATE,
    reviewByUserId: DataTypes.INTEGER,
    doneAt: DataTypes.DATE,
    doneByUserId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tasks',
    paranoid: true
  });
  return Tasks;
};
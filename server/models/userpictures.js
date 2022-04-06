'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPictures extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserPictures.init({
    userId: DataTypes.INTEGER,
    picture: DataTypes.BLOB,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserPictures',
  });
  return UserPictures;
};
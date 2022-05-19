'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Actualite);
    }
  }
  User.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    statut: DataTypes.ENUM('attente', 'valide', 'refuse'),
    droits: DataTypes.ENUM('standard', 'admin'),
    profils: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actualite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Actualite.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
      models.Actualite.belongsToMany(models.Theme, {through: 'Actu_themes'});
    }
  }
  Actualite.init({
    date_publication: DataTypes.DATE,
    id_users: DataTypes.INTEGER,
    titre: DataTypes.STRING,
    titre2: DataTypes.STRING,
    texte: DataTypes.STRING,
    vignette: DataTypes.STRING,
    lien: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Actualite',
  });
  return Actualite;
};
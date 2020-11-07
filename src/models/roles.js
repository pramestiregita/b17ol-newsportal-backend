'use strict'
const {
  Model
} = require('sequelize')
// const { Sequelize } = require('.')
// const Users = require('./users')
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Roles.associate = Roles.hasMany(models.Users, { foreignKey: 'rolesId' })
    }
  };
  Roles.init({
    roleName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles'
  })
  // Roles.hasMany(, { foreignKey: 'rolesId' })
  return Roles
}

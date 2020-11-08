'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      // Roles.associate = Roles.hasMany(models.Users, { foreignKey: 'rolesId', as: 'roleId' })
    }
  };
  Roles.init({
    roleName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Roles'
  })
  // Roles.hasMany(, { foreignKey: 'rolesId' })
  return Roles
}

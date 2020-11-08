'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PostImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  PostImage.init({
    postId: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: 'Post id must be filled'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Please choose an image'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'PostImage'
  })
  return PostImage
}

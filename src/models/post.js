'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Post.belongsTo(models.Users, { foreignKey: 'userId', as: 'author' })
    }
  };
  Post.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please Insert userId'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Title already existed'
      },
      validate: {
        notNull: {
          msg: 'Title can\'t be emmpty'
        }
      }
    },
    news: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: {
        msg: 'You\'re copied this news!'
      },
      validate: {
        notNull: 'News can\'t be empty'
      }
    }
  }, {
    sequelize,
    modelName: 'Post'
  })
  return Post
}

const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Comment = sequelize.define(
  "Comment",
  {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true, 
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'user_id'
      }
    },
    collection_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Collection',
        key: 'collection_id'
      }
    },
    comment_body: {
        type: DataTypes.STRING,
        allowNull: true
    }
  },
);

module.exports = Comment;
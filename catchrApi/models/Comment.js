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
    },
    collection_id: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    comment_body: {
        type: DataTypes.STRING,
        allowNull: true
    }
  },
);

module.exports = Comment;
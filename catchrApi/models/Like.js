const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Like = sequelize.define(
  "Like",
  {
    like_id: {
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "likes",
  }
);

module.exports = Like;

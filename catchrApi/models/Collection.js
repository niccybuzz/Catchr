const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Collection = sequelize.define(
  "Collection",
  {
    collection_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true, 
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    tableName: "collections",
  }
);

module.exports = Collection;

const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: false,
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;

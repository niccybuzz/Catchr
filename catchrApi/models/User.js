const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");
const Collection = require('./Collection');

const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true
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
        default: false
      },
    },
    {
      tableName: "user"
    }
  );

  //User.hasMany(Collection);
  

  User.sync().then((response) => {
    console.log("User synced")
  }).catch((err) => {
    console.log("Error syncing user")
  });
  

  module.exports = User;
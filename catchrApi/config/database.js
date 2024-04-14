// config/database.js
const Sequelize = require("sequelize");
const { DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "catchr",
});


module.exports = sequelize;

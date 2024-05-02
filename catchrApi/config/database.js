// config/database.js
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  port: 3306,
  password: "",
  database: "40405902",
  logging: false
});


module.exports = sequelize;

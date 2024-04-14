// Database connection. DB config found in .env file
require("dotenv").config();
const mysql = require("mysql2");

// Creating connection pool object using .env config file details
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 10,
  port: process.env.DB_PORT,
  multipleStatements: true,
});

// Creating connection
connection.getConnection((err) => {
  if (err) return console.log(err.message);
  console.log("connected to local mysql db using .env properties");
});

module.exports = connection;

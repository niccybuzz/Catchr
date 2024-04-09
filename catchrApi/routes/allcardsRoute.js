const express = require('express');
const router = express.Router();
const fs = require('fs');
const connection = require('../db');

//GET request for all cards
router.get("/", (req, res) => {
  // Reading from sql query in separate file and loading into a variable
  fs.readFile("./SQLqueries/allCards.sql", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading SQL file:", err);
      return res.status(500).send("Internal Server Error");
    }
    let sqlQuery = data;

    // Sending query to MySQL database
    connection.query(sqlQuery, (err, data) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).send("Internal Server Error");
      }

      // Responding with json data
      res.json(data);
    });
  });
});

module.exports = router;

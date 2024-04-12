const express = require('express');
const router = express.Router();
const fs = require('fs');
const connection = require('../db');

//GET request for all cards
router.get("/", (req, res) => {
  let userid = req.query.id
  // Reading from sql query in separate file and loading into a variable
  const sqlQuery = fs.readFileSync("./SQLqueries/allCollects.sql").toString();

    // Sending query to MySQL database
    connection.query(sqlQuery, [userid],  (err, data) => {
      if (err) {
        console.error("Error executing SQL query:", err);
        return res.status(500).send("Internal Server Error");
      }
      // Responding with json data
      res.json(data);
    });
  });


module.exports = router;
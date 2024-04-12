const express = require('express');
const router = express.Router();
const fs = require('fs');
const connection = require('../db');

//GET to get specific details about a single card
router.get("/", (req, res) => {

    let id = req.query.id;

    const sqlQuery = fs.readFileSync("./SQLqueries/cardDetails.sql").toString();
  
      // Sending query to MySQL database
      connection.query(sqlQuery, id, (err, data) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          return res.status(500).send("Internal Server Error");
        }
        // Responding with json data
        console.log(data);
        res.json(data);
      });
    });
 

  module.exports = router;
  
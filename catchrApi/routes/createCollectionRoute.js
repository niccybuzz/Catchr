const express = require("express");
const router = express.Router();
const fs = require('fs');
const connection = require('../db');

//GET request to create new used
router.post("/", (req, res) => {
    const userid = req.body.id;
    const collecName = req.body.collecName;
    const values = [userid, collecName]
    console.log(values);
    const sqlQuery = fs.readFileSync("./SQLqueries/createCollection.sql").toString();
  
      // Sending query to MySQL database
      connection.query(sqlQuery, values, (err, data) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          return res.status(500).send("Internal Server Error");
        }
        // Responding with json data
        res.json(data);
      });
    });

module.exports = router;
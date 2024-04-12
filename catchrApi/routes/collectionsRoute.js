const express = require("express");
const router = express.Router();
const fs = require("fs");
const connection = require("../db");

//GET request for all collections
router.get("/", (req, res) => {
  const userid = req.query.userid;

  let sqlQuery = `SELECT * FROM collections`;
  if (userid) {
    sqlQuery += ` WHERE user_id = ${userid}`;
  }

  console.log(sqlQuery);

  // Sending query to MySQL database
  connection.query(sqlQuery, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).send("Internal Server Error");
    }
    // Responding with json data
    res.status(200).json(data);
  });
});

//GET request to create new used
router.post("/", (req, res) => {
  const userid = req.body.id;
  const collecName = req.body.collecName;
  const values = [userid, collecName];

  const sqlQuery = `INSERT INTO collections (user_id, collection_name) VALUES ( ? , ? )`

  // Sending query to MySQL database
  connection.query(sqlQuery, values, (err, data) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).send("Internal Server Error");
    }
    // Responding with json data
    console.log("Collection created");
    res.status(201).json(data);
  });
});

module.exports = router;

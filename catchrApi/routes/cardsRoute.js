const express = require("express");
const router = express.Router();
const fs = require("fs");
const connection = require("../db");

//GET to fetch a card, a single card, or a set of cards
router.get("/", (req, res) => {
  let id = req.query.id;
  let sortby = req.query.sort;
 
  console.log("Card id " + id + ", sort method "+ sortby);

  
  // Reading from sql query in separate file and loading into a variable
  let sqlQuery = fs.readFileSync("./SQLqueries/allCards.sql").toString();
    if (id){
      sqlQuery += ` WHERE cards.card_id = ${id}`;
    }

    if (sortby) {
      sqlQuery += ` ORDER BY ${sortby}`
    }

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


module.exports = router;

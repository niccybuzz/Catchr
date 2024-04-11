const express = require("express");
const router = express.Router();
const fs = require("fs");
const connection = require("../db");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  //get sql query for checking login details
  fs.readFile("./SQLqueries/login.sql", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading SQL file:", err);
      return res.status(500).send("Internal Server Error");
    }
    let sqlQuery = data;

    // Insert user into the database
    connection.query(sqlQuery, [username, username], async (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send('Internal Server Error');
          }
      
          if (results.length === 0) {
            // Username not found
            return res.status(401).send('Invalid username or password');
          }
      
          const hashedPassword = results[0].password;
      
          // Compare the provided password with the hashed password from the database
          const passwordMatch = await bcrypt.compare(password, hashedPassword);
      
          if (passwordMatch) {
            // Passwords match, authentication successful
            res.json(results[0]);
            
          } else {
            // Passwords don't match
            res.status(401).send('Invalid username or password');
          }
    });
  });
});

module.exports = router;
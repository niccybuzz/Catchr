const express = require("express");
const router = express.Router();
const fs = require("fs");
const connection = require("../db");
const bcrypt = require("bcrypt");
const { Console } = require("console");

// Log in
router.post("/", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let sqlQuery = `SELECT user_id, username, password, user_type_description FROM user INNER JOIN user_types ON user.user_type_id = user_types.user_type_id WHERE username = ? OR email_address = ?`;

  // search database for the user
  connection.query(sqlQuery, [username, username], async (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).send("Internal Server Error");
    }

    if (results.length === 0) {
      Console.log("No user with those credentials found");
      return res.status(401).send("Invalid username or password");
    }

    // Compare the provided password with the hashed password from the database
    const hashedPassword = results[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      console.log("Password Match");
      res.status(200).json(results[0]);
    } else {
      console.log("Password Dont Match");
      res.status(401).send("Passwords Don't Match");
    }
  });
});

module.exports = router;

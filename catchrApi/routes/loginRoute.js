const express = require("express");
const router = express.Router();
const fs = require("fs");
const connection = require("../db");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let sqlQuery = `SELECT * FROM user WHERE username = ? OR email_address = ?;`;

  // Insert user into the database
  connection.query(sqlQuery, [username, username], async (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).send("Internal Server Error");
    }

    if (results.length === 0) {
      return res.status(401).send("Invalid username or password");
    }

    const hashedPassword = results[0].password;

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    // Passwords match, authentication successful
    if (passwordMatch) {
      res.json(results[0]);

    } else {
      res.status(401).send();
    }
  });
});

module.exports = router;

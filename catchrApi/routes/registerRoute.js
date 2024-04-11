const express = require("express");
const router = express.Router();
const fs = require("fs");
const connection = require("../db");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  //get generate sql query
  fs.readFile("./SQLqueries/createNewUser.sql", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading SQL file:", err);
      return res.status(500).send("Internal Server Error");
    }
    let sqlQuery = data;

    // Insert user into the database
    connection.query(sqlQuery, [username, email, hashedPassword], (err, data) => {
      if (err) throw err;
      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

module.exports = router;

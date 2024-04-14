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

    let sqlQuery = `INSERT INTO
    user ( username, email_address, password, user_type_id) VALUES ( ?, ?, ?, 1 );`

    // Insert user into the database
    connection.query(sqlQuery, [username, email, hashedPassword], (err, data) => {
      if (err) throw err;
      res.status(201).json({ message: "User registered successfully" });
    });
  });

module.exports = router;

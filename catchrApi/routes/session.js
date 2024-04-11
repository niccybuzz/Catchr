const express = require('express');
const router = express.Router();
const fs = require('fs');
const connection = require('../db');

router.get("/", (req, res) => {
    const sqlquery = `SELECT * FROM user WHERE user_id = ?`
    connection.query()
})



connection.query


module.exports = router;
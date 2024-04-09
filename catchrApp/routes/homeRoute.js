const express = require("express");
const router = express.Router();

//base URL route
router.get("/", (req, res) => {
    res.render("home");
  });

module.exports = router;
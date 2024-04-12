const express = require("express");
const router = express.Router();
const axios = require("axios");

//renders page for creating new collection
router.get("/", (req, res) => {
  if (req.session.authen) {
    res.render("createCollection");
  } else {
    res.redirect("/login");
  }
});



module.exports = router;

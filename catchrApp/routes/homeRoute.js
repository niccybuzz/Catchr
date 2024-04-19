const express = require("express");
const router = express.Router();
const redirectCards = require("../middleware/redirectCards")

// get login page
router.get("/", redirectCards, (req, res) => {
  const sessionObj = req.session;
  res.render("home", { user: sessionObj });
});

module.exports = router;

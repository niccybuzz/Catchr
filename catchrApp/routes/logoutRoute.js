const express = require("express");
const router = express.Router();

// Logs a user out
router.get("/", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
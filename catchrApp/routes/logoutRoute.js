const express = require("express");
const router = express.Router();

// get login page
router.get("/", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
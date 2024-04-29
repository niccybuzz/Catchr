const express = require("express");
const router = express.Router();

// Go to home page
router.get("/", (req, res) => {
  const sessionObj = req.session;
  res.render("home", { user: sessionObj });
});



module.exports = router;

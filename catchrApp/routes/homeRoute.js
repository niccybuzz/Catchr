const express = require("express");
const router = express.Router();

// get login page
router.get("/", (req, res) => {
  const sessionObj = req.session;
  console.log(sessionObj);

  res.render("home", { user: sessionObj });
});

module.exports = router;

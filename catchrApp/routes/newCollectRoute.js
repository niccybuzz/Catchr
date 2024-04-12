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

// Post method to create a new collection
router.post("/", (req, res) => {

  const collecName = req.body.collecName;
  const userid = req.session.authen;

  const collection = {
    id: userid,
    collecName: collecName
  };

  console.log(collection);

  // Setting configuration to allow app to parse url data
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const endp = "http://localhost:4000/createcollec";

  axios
    .post(endp, collection, config)
    .then((response) => {
      res.send("new collection created");
    })
    .catch((err) => {
      res.send("error");
    });
});

module.exports = router;

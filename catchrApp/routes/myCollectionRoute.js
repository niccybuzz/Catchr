const express = require("express");
const router = express.Router();
const axios = require("axios");
const redirectLogin = require("../middleware/redirectLogin");

router.get("/", redirectLogin, async (req, res) => {
  const id = req.session.authen;

  let endp = `http://localhost:4000/api/collections/${id}`;

  await axios
    .get(endp) // Pass id as a query parameter
    .then((response) => {
      let collection = response.data;
      res.render("myCollection", { collection: collection, user: req.session });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Post method to create a new collection
router.post("/", (req, res) => {
  const collecName = req.body.collecName;
  const userid = req.session.authen;

  const collection = {
    id: userid,
    collecName: collecName,
  };

  // Setting configuration to allow app to parse url data
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const endp = "http://localhost:4000/api/collections";

  axios
    .post(endp, collection, config)
    .then((response) => {
      res.status(200).send("New collection successfully created");
    })
    .catch((err) => {
      res.status(400).send("Bad request");
    });
});

module.exports = router;

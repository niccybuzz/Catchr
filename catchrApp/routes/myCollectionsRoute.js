const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    if (req.session.authen) {
      const id = req.session.authen;
      console.log(id);
  
      let endp = "http://localhost:4000/api/collections";
  
      await axios
        .get(endp) // Pass id as a query parameter
        .then((response) => {
          let collections = response.data;
          let myCollections = [];

          collections.forEach((collection) => {
            if (collection.id = id) {
              myCollections.push(collection);
            }
          })
          res.render("myCollections", { collections : myCollections });
        })
        .catch((err) => {
          res.status(400).send("Bad request");
        });
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

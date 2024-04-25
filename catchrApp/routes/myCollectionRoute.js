const express = require("express");
const router = express.Router();
const axios = require("axios");
const redirectLogin = require("../middleware/redirectLogin");

router.get("/add", async (req, res) => {
  try {
    const { collection, card } = req.query;
    const token = req.session.authToken
    const endp = `http://localhost:4000/api/collections/card`;
    console.log(card)
    console.log(collection)
    const body = {
      card_id: card,
      collection_id: collection,
    };
    // Setting configuration to allow app to parse url data
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token}`
      },
    };

    const results = await axios.post(endp, body, config);

    res.status(200).json(results.data)
  } catch (err) {
    console.log(err.data);
  }
});

router.get("/remove", async (req, res) => {
  try {
    const { collection, card } = req.query;

    const token = req.session.authToken
    const endp = `http://localhost:4000/api/collections/card`;
    const body = {
      card_id: card,
      collection_id: collection,
    };
    // Setting configuration to allow app to parse url data
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    };
    const results = await axios.delete(endp, { data: body, ...config });
    res.status(200).json(results.data)
  } catch (err) {
    res.redirect("/mycollection")
  }
});

router.get("/", redirectLogin, async (req, res) => {
  const user_id = req.session.authen;
  let endp = `http://localhost:4000/api/collections/${user_id}`;

  await axios
    .get(endp) // Pass id as a query parameter
    .then((response) => {
      let collection = response.data.collection;
      let cards = response.data.collection.Cards
      res.render("myCollection", {
        collection: collection,
        cards: cards,
        user: req.session,
      });
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

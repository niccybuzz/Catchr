const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:userid", async (req, res) => {
  try {
    const sessionObj = req.session
    const user_id = req.params.userid;
    const endp = `http://localhost:4000/api/collections/${user_id}`;
    const results = await axios.get(endp);
    const collection = results.data.collection;
    const cards = collection.Cards;
    const stats = results.data.stats;

    if (sessionObj.authen == user_id) {
      res.redirect("/mycollection");
    } else {
      res.render("singlecollection", {
        collection: collection,
        user: req.session,
        cards: cards,
        stats: stats,
      });
    }
  } catch (err) {
    res.send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const endp = `http://localhost:4000/api/collections`;
    const results = await axios.get(endp);
    const collections = results.data;
    res.render("collections", { collections: collections, user: req.session });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;

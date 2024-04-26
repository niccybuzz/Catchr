const express = require("express");
const router = express.Router();
const axios = require("axios");
const redirectLogin = require("../middleware/redirectLogin");

/**
 * Adds a card to your own collection. 
 * Sends collection id, card id and a JWT to the rest api
 * Returns a confirmation message or error message
 */
router.get("/add", async (req, res) => {
  try {
    const { collection, card } = req.query;
    const token = req.session.authToken;
    const endp = `http://localhost:4000/api/collections/card`;
    const body = {
      card_id: card,
      collection_id: collection,
    };
    // Setting configuration to allow app to parse url data
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    };

    const results = await axios.post(endp, body, config);

    res.status(200).json(results.data);
  } catch (err) {
    console.log(err.data);
  }
});

/**
 * Removes a card from a collection
 * Send collection id, card id and auth token
 * Returns confirmation message or error
 */
router.get("/remove", async (req, res) => {
  try {
    const { collection, card } = req.query;

    const token = req.session.authToken;
    const endp = `http://localhost:4000/api/collections/card`;
    const body = {
      card_id: card,
      collection_id: collection,
    };
    // Setting configuration to allow app to parse url data
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const results = await axios.delete(endp, { data: body, ...config });
    res.status(200).json(results.data);
  } catch (err) {
    res.redirect("/mycollection");
  }
});

module.exports = router;

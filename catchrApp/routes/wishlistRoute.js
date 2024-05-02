const express = require("express");
const router = express.Router();
const axios = require("axios");
const redirectLogin = require("../middleware/redirectLogin");

/**
 * Adds a card to your own wishlist.
 * Sends wishlist id, card id and a JWT to the rest api
 * Returns a confirmation message or error message
 */
router.get("/add", async (req, res) => {
  try {
    const { wishlist, card } = req.query;
    console.log(wishlist)
    console.log(card)
    const token = req.session.authToken;
    const endp = `http://localhost:4000/api/wishlists/card`;
    const body = {
      card_id: card,
      wishlist_id: wishlist,
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
    res.status(500).json(err.response.data);
    
  }
});

/**
 * Takes user to their wishlist
 * Unlike collections, wishlists don't allow likes or comments
 */
router.get("/", redirectLogin, async (req, res) => {
  try {
    const user_id = req.session.authen

    const myWishlistResults = await axios.get(
      `http://localhost:4000/api/wishlists/user/${user_id}`
    );
    const myCollectionResults = await axios.get(`http://localhost:4000/api/collections/user/${user_id}`)
    const mywishlist = myWishlistResults.data;
    const mycollection = myCollectionResults.data.collection;
    const cards = mywishlist.Cards;
    res.render("MyWishlist", {
      user: req.session,
      wishlist: mywishlist,
      collection: mycollection,
      cards: cards,
    });
  } catch (err) {
    console.log(err.message);
    res.render("error", { error: err, user: req.session });
  }
});

/**
 * Removes a card from a wishlist
 * Send wishlist id, card id and auth token
 * Returns confirmation message or error
 */
router.get("/remove", async (req, res) => {
  try {
    const { wishlist, card } = req.query;

    const token = req.session.authToken;
    const endp = `http://localhost:4000/api/wishlists/card`;
    const body = {
      card_id: card,
      wishlist_id: wishlist,
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
    res.render("error", {error: err, user: req.session})
  }
});

module.exports = router;

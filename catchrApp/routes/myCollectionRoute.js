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
    console.log(collection)
    console.log(card)
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
    console.log(err.response.data);
    res.send(err.response.data);
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

/**
 * Takes user to the collections dashboard
 * Retrieves the users collection (with all cards and status),
 * a list of other user's collections, and all comments on user's collection.
 */
router.get("/", redirectLogin, async (req, res) => {
  try {
    const user_id = req.session.authen;
    // Declaring these as null so that i can still pass empty to the browser if user isn't logged in
    let mystats,
      mycollection,
      cards,
      mywishlist,
      myComments = null;

    try {
      
      //Getting my collection details, cards and stats
      const myCollecResults = await axios.get(
        `http://localhost:4000/api/collections/user/${user_id}`
      );
      const myWishlistResults = await axios.get(
        `http://localhost:4000/api/wishlists/user/${user_id}`
      );
      
      mycollection = myCollecResults.data.collection;

      
     

      mywishlist = myWishlistResults.data;
      mystats = myCollecResults.data.stats;
      cards = mycollection.Cards;
      const mycollection_id = mycollection.collection_id;
      // Getting all comments on my collection, if any
      try {
        const commentsResults = await axios.get(
          `http://localhost:4000/api/comments/collection/${mycollection_id}`
        );
        myComments = commentsResults.data;
        myComments = await markMyComments(myComments, user_id);
      } catch (err) {
        myComments = null;
      }
    } catch (err) {
      res.render("error", {error: err, user: req.session})
    }

    res.render("MyCollection", {
      user: req.session,
      collection: mycollection,
      wishlist: mywishlist,
      stats: mystats,
      cards: cards,
      comments: myComments,
    });
  } catch (err) {
    console.log(err.response.data);
    console.log(err);
    res.render("error", { error: err, user: req.session });
  }
});

module.exports = router;

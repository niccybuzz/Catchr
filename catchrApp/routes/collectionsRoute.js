const express = require("express");
const router = express.Router();
const axios = require("axios");

/**
 * Posts a comment on a collection
 * Sends collection id, user id, authentication token and comment body
 * Returns confirmation message or error for popup
 */
router.post("/comment/:collectionid", async (req, res) => {
  try {
    const collection_id = req.params.collectionid;
    const sessionObj = req.session;
    const token = sessionObj.authToken;
    const { comment } = req.body;
    const user_id = sessionObj.authen;
    const endp = `http://localhost:4000/api/comments`;
    const postComment = {
      collection_id: collection_id,
      user_id: user_id,
      comment_body: comment,
    };
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    };

    const results = await axios.post(endp, postComment, config);
    res.redirect("/collections");
  } catch (err) {
    res.status(500).json("Server error: " + err);
  }
});

router.delete("/comment/delete/:id", async (req, res) => {
  try {
    const sessionObj = req.session;
    const token = sessionObj.authToken;
    const comment_id = req.params.id;
    console.log(comment_id);
    const endp = `http://localhost:4000/api/comments/${comment_id}`;
    const result = await axios.delete(endp);
    res.status(200).json("Comment deleted");
  } catch (err) {
    console.log(err.response.data);
  }
});

/**
 * Gets a single collection belonging to a user
 * returns the collection details, the cards inside, and the collection status
 * If a user searches for their own user id, redirects to the main collections page
 */
router.get("/:userid", async (req, res) => {
  try {
    const sessionObj = req.session;
    const user_id = req.params.userid;
    const endp = `http://localhost:4000/api/collections/${user_id}`;
    const results = await axios.get(endp);
    const collection = results.data.collection;
    const cards = collection.Cards;
    const stats = results.data.stats;

    // Getting a list of all collections on the site
    const allCollecResults = await axios.get(
      `http://localhost:4000/api/collections`
    );
    const collections = allCollecResults.data;

    const collection_id = collection.collection_id;
    let comments = null;
    try {
      const commentsResults = await axios.get(
        `http://localhost:4000/api/comments/collection/${collection_id}`
      );
      comments = commentsResults.data;
    } catch (err) {
      comments = null;
    }

    if (sessionObj.authen == user_id) {
      res.redirect("/collections/mycollection");
    } else {
      res.render("singlecollection", {
        collection: collection,
        user: req.session,
        cards: cards,
        stats: stats,
        comments: comments,
        collections: collections
      });
    }
  } catch (err) {
    res.send(err.response.data);
  }
});

/**
 * Takes user to the collections dashboard
 * Retrieves the users collection (with all cards and status),
 * a list of other user's collections, and all comments on user's collection.
 */
router.get("/mycollection", async (req, res) => {
  try {
    const user_id = req.session.authen;

    // Getting a list of all collections on the site
    const allCollecResults = await axios.get(
      `http://localhost:4000/api/collections`
    );
    const collections = allCollecResults.data;

    // Declaring these as null so that i can still pass empty to the browser if user isn't logged in
    let mystats,
      mycollection,
      cards,
      myComments = null;
    if (user_id) {
      //Getting my collection details, cards and stats
      const myCollecResults = await axios.get(
        `http://localhost:4000/api/collections/${user_id}`
      );
      mycollection = myCollecResults.data.collection;
      mystats = myCollecResults.data.stats;
      cards = mycollection.Cards;

      // Getting all comments on my collection
      const mycollection_id = mycollection.collection_id;
      try {
        const commentsResults = await axios.get(
          `http://localhost:4000/api/comments/collection/${mycollection_id}?user_id=${user_id}`
        );
        myComments = commentsResults.data;
        myComments = await markMyComments(myComments, user_id);
      } catch (err) {
        myComments = null;
      }
    }
    res.render("collections", {
      collections: collections,
      user: req.session,
      collection: mycollection,
      stats: mystats,
      cards: cards,
      comments: myComments,
    });
  } catch (err) {
    if (err.status == 404) {
    }
    res.send(err.response.data);
  }
});

/**
 * Function for marking all the comments posted by the user, allowing them to delete their comments
 * @returns
 */
async function markMyComments(comments, user_id) {
  comments.forEach((comment) => {
    if (comment.user_id == user_id) {
      comment.isMine = true;
      console.log(comment);
    }
  });
  return comments;
}

module.exports = router;

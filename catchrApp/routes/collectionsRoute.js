const express = require("express");
const router = express.Router();
const axios = require("axios");
const redirectLogin = require("../middleware/redirectLogin")

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

    console.log(collection_id)
    console.log(comment)
    console.log(user_id)
    const endp = `http://localhost:4000/api/comments`;
    const postComment = {
      collection_id: collection_id,
      user_id: user_id,
      comment_body: comment,
    };
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token}`,
      },
    };

    const results = await axios.post(endp, postComment, config);
    const owner_id = results.data.owner_id

    res.redirect(`/collections/${owner_id}`);
  } catch (err) {
    res.render("error", {error: err, user: req.session})
  }
});

//Route for deleting a specific comment
router.delete("/comment/delete/:id", async (req, res) => {
  try {
    const sessionObj = req.session;
    const token = sessionObj.authToken;
    const comment_id = req.params.id;
    
    const endp = `http://localhost:4000/api/comments/${comment_id}`;
    const result = await axios.delete(endp);
    res.status(200).json("Comment deleted");
  } catch (err) {
    console.log(err);
    res.render("error", {error: err, user: req.session})
  }
});



//Gets a list of top 10 user collections by likes
router.get("/topcollections", async (req, res) => {
  try {
    let sortBy = req.query.sortBy || "numLikes" ;
    let sortOrder = req.query.sortOrder || "desc";
    let page = req.query.page;
    const topCollectionsData = await axios.get(
      `http://localhost:4000/api/collections/?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}`
    );
    const collections = topCollectionsData.data.collections;
    let pagination = topCollectionsData.data.paginations
    res.render("allCollections", {
      collections: collections,
      user: req.session,
      pagination: pagination
    });
  } catch (err) {
    console.log(err.response.data);
    console.log(err);
    res.render("error", {error: err, user: req.session})
  }
});

// "Likes" a collection
router.get("/like/:collection_id", redirectLogin, async (req, res) => {
  try {
    const user_id = req.session.authen;
    const token = req.session.authToken;
    const collection_id = req.params.collection_id;
    const endp = `http://localhost:4000/api/likes`
  
    const like = {
      user_id: user_id,
      collection_id: collection_id
    }
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token}`,
      },
    };
    const results = await axios.post(endp, like, config)
    const owner_id = results.data.collection.user_id
    res.redirect(`/collections/${owner_id}`);
  } catch (err) {
    console.log(err.response.data)
    res.render("error", {error: err, user: req.session})
  }
});

// "Unlikes" a collection
router.get("/unlike/:collection_id", redirectLogin, async (req, res) => {
  try {
    const user_id = req.session.authen;
    const token = req.session.authToken;
    const collection_id = req.params.collection_id;
    const endp = `http://localhost:4000/api/likes?user_id=${user_id}&collection_id=${collection_id}`

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const results = await axios.delete(endp, config)
    const owner_id = results.data.collection.user_id
    res.redirect(`/collections/${owner_id}`);
  } catch (err) {
    res.render("error", {error: err, user: req.session})
  }
});

/**
 * Gets a single collection belonging to a user
 * returns the collection details, the cards inside, and the collection stats
 * If a user searches for their own user id, redirects to the main collections page
 */
router.get("/:owner_id", async (req, res) => {
  try {
    const sessionObj = req.session;
    const user_id = sessionObj.authen;

    const owner_id = req.params.owner_id;
    const endp = `http://localhost:4000/api/collections/user/${owner_id}`;
    const results = await axios.get(endp);
    const collection = results.data.collection;
    const collection_id = collection.collection_id;

    const cards = collection.Cards;
    const stats = results.data.stats;

    // Getting all comments on my collection, if any and marking user's own ones
    let comments = null;
    try {
      const commentsResults = await axios.get(
        `http://localhost:4000/api/comments/collection/${collection_id}`
      );
      comments = commentsResults.data;
      comments = await markMyComments(comments, user_id);
    } catch (err) {
      comments = null;
    }

    if (user_id == collection.User.user_id) {
    
      res.redirect("/mycollection");
    } else {
      let collectionLiked = false;
      try{
        const checkLiked = await axios.get(`http://localhost:4000/api/likes/singlelike/?user_id=${user_id}&collection_id=${collection_id}`)
        collectionLiked = true;
      } catch (err) {
        collectionLiked = false
      }
      
      res.render("userCollection", {
        collection: collection,
        user: req.session,
        cards: cards,
        stats: stats,
        comments: comments,
        liked: collectionLiked
      });
    }
  } catch (err) {
    console.log(err.response.data)
    res.render("error", {error: err, user: req.session})
  }
});

/**
 * Function for marking all the comments posted by the user, allowing them to delete their comments
 * @returns marked comments
 */
async function markMyComments(comments, user_id) {
  comments.forEach((comment) => {
    if (comment.user_id == user_id) {
      comment.isMine = true;
    }
  });
  return comments;
}

module.exports = router;

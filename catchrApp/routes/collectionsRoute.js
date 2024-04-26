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
    res.redirect(`/collections/${collection_id}`);
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
 * Takes user to the collections dashboard
 * Retrieves the users collection (with all cards and status),
 * a list of other user's collections, and all comments on user's collection.
 */
router.get("/mycollection", async (req, res) => {
  try {
    const user_id = req.session.authen;
    // Declaring these as null so that i can still pass empty to the browser if user isn't logged in
    let mystats,
      mycollection,
      cards,
      myComments = null;
    if (user_id) {
      try {
        //Getting my collection details, cards and stats
        const myCollecResults = await axios.get(
          `http://localhost:4000/api/collections/user/${user_id}`
        );
        mycollection = myCollecResults.data.collection;
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
        mycollection, mystats, (cards = null);
      }
    }
    res.render("MyCollection", {
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

router.get("/topcollections", async (req, res) => {
  try {
    let sortBy = req.query.sortBy || "numLikes" ;
    let sortOrder = req.query.sortOrder || "desc";
    const allCollectionsData = await axios.get(
      `http://localhost:4000/api/collections/?sortBy=${sortBy}&sortOrder=${sortOrder}`
    );
    const collections = allCollectionsData.data;
    res.render("topcollections", {
      collections: collections,
      user: req.session,
    });
  } catch (err) {
    res.send(err);
  }
});

router.get("/like/:collection_id", async (req, res) => {
  try {
    const user_id = req.session.authen;
    const token = req.session.authToken;
    const collection_id = req.params.collection_id;
    const endp = `http://localhost:4000/api/likes`
    console.log(user_id)
    console.log(token)
    console.log(collection_id)
  
    const like = {
      user_id: user_id,
      collection_id: collection_id
    }
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    };
    const results = await axios.post(endp, like, config)
    console.log(results.data)
    res.redirect(`/collections/${collection_id}`);
  } catch (err) {
    console.log(err)
    res.redirect("/login")
  }
});

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
    console.log(results.data)
    res.redirect(`/collections/${collection_id}`);
  } catch (err) {
    res.send(err);
  }
});

/**
 * Gets a single collection belonging to a user
 * returns the collection details, the cards inside, and the collection status
 * If a user searches for their own user id, redirects to the main collections page
 */
router.get("/:collection_id", async (req, res) => {
  try {
    const sessionObj = req.session;
    const user_id = sessionObj.authen;

    const collection_id = req.params.collection_id;
    const endp = `http://localhost:4000/api/collections/${collection_id}`;
    const results = await axios.get(endp);
    const collection = results.data.collection;
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
      console.log("That's my collection");
      res.redirect("/collections/mycollection");
    } else {
      let collectionLiked = false;
      try{
        const checkLiked = await axios.get(`http://localhost:4000/api/likes/singlelike/?user_id=${user_id}&collection_id=${collection_id}`)
        console.log("Collection liked")
        collectionLiked = true;
      } catch (err) {
        console.log("Collection not liked")
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
    res.send(err);
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
      console.log(comment);
    }
  });
  return comments;
}

module.exports = router;

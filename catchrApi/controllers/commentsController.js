const express = require("express");
const { Op } = require("sequelize");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Collection = require("../models/Collection");
const authenticateJWT = require("../auth/authenticateJWT");

const router = express.Router();

router.delete("/:comment_id", async(req, res)=> {
  try{
    const comment_id = req.params.comment_id;
    console.log(comment_id)
    const comment = await Comment.findByPk(comment_id);
    if (!comment) {
      res.status(404).json("Can't find that comment")
    } else {
      await comment.destroy();
      res.status(200).json("Comment deleted")
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

/**
 * Gets all of the comments on a single collection with user details
 */
router.get("/collection/:collection_id", async (req, res) => {
  try {
    const collection_id = req.params.collection_id;
    const allComments = await Comment.findAll({
      where: {
        collection_id: collection_id,
      },
      include: [
        {
          model: User,
          attributes: ["username", "user_id"],
        },
      ],
    });
    if (allComments.length > 0){
      res.status(200).json(allComments);
    } else {
      res.status(404).json("No comments found")
    }
    
  } catch (err) {
    res.json(500).json("Error getting comments on that collection");
  }
});

/**
 * Gets all the comments from a single user with user details
 */
router.get("/user/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const allComments = await Comment.findAll({
      where: {
        user_id: user_id,
      },
      include: [
        {
          model: User,
          attributes: ["username", "user_id"],
        },
      ],
    });
    res.status(200).json(allComments);
  } catch (err) {
    res.json(500).json("Error getting comments from that user" + err);
  }
});



/**
 * Gets all comments and its user details from the database
 */
router.get("/", async (req, res) => {
  try {
    const allComments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "user_id"],
        },
      ],
    });

    res.status(200).json(allComments);
  } catch (err) {
    res.json(500).json("Error getting all comments")
  }
});

router.post("/", async (req, res) => {
  try {
    const { collection_id, comment_body, user_id } = req.body;
    console.log(collection_id)
    console.log(comment_body)
    console.log(user_id)
    const newComment = await Comment.create({
      user_id: user_id,
      collection_id: collection_id,
      comment_body: comment_body,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json("Error posting comment: " + err);
  }
});

module.exports = router;

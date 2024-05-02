const express = require("express");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Collection = require("../models/Collection");
const authenticateJWT = require("../auth/authenticateJWT");

const router = express.Router();

router.delete("/:comment_id", authenticateJWT, async (req, res) => {
  try {
    const comment_id = req.params.comment_id;
    const comment = await Comment.findByPk(comment_id);
    if (!comment) {
      res.status(404).json("Can't find that comment");
    } else {
      if (req.user.id == comment.user_id || req.user.admin) {
        await comment.destroy();
        res.status(200).json("Comment deleted");
      } else {
        res
          .status(500)
          .json("You don't have authorization to delete that comment");
      }
    }
  } catch (err) {
    res.status(500).json("Server Error" + err);
  }
});

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
    if (allComments.length > 0) {
      res.status(200).json(allComments);
    } else {
      res.status(404).json("No comments found");
    }
  } catch (err) {
    res
      .json(500)
      .json("Server error getting comments on that collection: " + err);
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
        {
          model: Collection,
          attributes: ["collection_id", "user_id"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    res.status(200).json(allComments);
  } catch (err) {
    res.json(500).json("Server error getting comments from that user" + err);
  }
});

/**
 * Gets all comments and its user details from the database
 */
router.get("/", async (req, res) => {
  try {
    const allComments = await Comment.findAll({
      attributes: ["comment_id", "comment_body"],
      include: [
        {
          model: User,

          attributes: ["username", "user_id"],
        },
        {
          model: Collection,
          attributes: ["collection_id"],
          include: [
            {
              model: User,
              attributes: ["username", "user_id"],
            },
          ],
        },
      ],
    });

    res.status(200).json(allComments);
  } catch (err) {
    res.json(500).json("Error getting all comments");
  }
});

//Posts a new comment
router.post("/", authenticateJWT, async (req, res) => {
  try {
    const { collection_id, comment_body, user_id } = req.body;

    console.log(req.body)
    const newComment = await Comment.create({
      user_id: user_id,
      collection_id: collection_id,
      comment_body: comment_body,
    });
    const collectionOwner = await Collection.findByPk(collection_id);
    let owner_id = collectionOwner.user_id;
    res.status(200).json({
      newComment: newComment,
      owner_id: owner_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Error posting comment: " + err);
  }
});

module.exports = router;

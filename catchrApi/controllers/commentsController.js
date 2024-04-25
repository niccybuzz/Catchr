const express = require("express");
const { Op } = require("sequelize");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Collection = require("../models/Collection");

const router = express.Router();

router.get("/collection/:id", async (req, res) => {
  try {
    const collection_id = req.params.id;
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
    res.status(200).json(allComments);
  } catch (err) {
    res.json(500).json("Error getting comments on that collection");
  }
});

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
    res.json(500).json("Error getting comments from that user");
  }
});

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
    const newComment = await Comment.create({
      user_id: user_id,
      collection_id: collection_id,
      comment_body: comment_body,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json("Error posting comment");
  }
});

module.exports = router;

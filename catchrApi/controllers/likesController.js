const express = require("express");
const router = express.Router();
const Like = require("../models/Like");
const Collection = require("../models/Collection");
const User = require("../models/User");
const cache = require("../cache/cache");
const cacheChecker = require("../cache/cacheChecker");
const updateCache = require("../cache/updateCache");

router.get("/singlelike", async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const collection_id = req.query.collection_id;
    const like = await Like.findOne({
      where: {
        user_id: user_id,
        collection_id: collection_id,
      },
    });
    if (like) {
      res.status(200).json(like);
    } else {
      res.status(404).json("No like found");
    }
  } catch (err) {
    res.status(500).json("Server error: " + err);
  }
});

router.get("/", cacheChecker, async (req, res) => {
  try {
    const likes = await Like.findAll({
      attributes: ["like_id", "user_id", "collection_id"],
    });
    const cacheKey = req.originalUrl;
    cache[cacheKey] = likes;
    req.lastRequestTimestamp = Date.now();
    console.log(req.originalUrl)
    res.status(200).json(cache[cacheKey])
  } catch (err) {
    res.status(404).json("Couldn't find likes");
  }
});

router.get("/user/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const usersLikes = await Like.findAll({
      attributes: ["like_id"],
      where: {
        user_id: user_id,
      },
      include: [
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
    res.status(200).json(usersLikes);
  } catch (err) {
    res.status(500).json("Server error: " + err);
  }
});

router.post("/", updateCache, async (req, res) => {
  try {
    const { collection_id, user_id } = req.body;
    const newLike = await Like.create({
      user_id: user_id,
      collection_id: collection_id,
    });
    const collection = await Collection.findOne({
      where: {
        collection_id: collection_id,
      },
    });
    let numLikes = collection.numLikes;

    const addLike = await collection.update({
      numLikes: numLikes + 1,
    });

    res.status(200).json({
      newLike: newLike,
      collection: collection,
    });
  } catch (err) {
    res.status(500).json("Error posting comment: " + err);
  }
});

router.delete("/", updateCache, async (req, res) => {
  try {
    const { collection_id, user_id } = req.query;
    const like = await Like.findOne({
      where: {
        user_id: user_id,
        collection_id: collection_id,
      },
    });
    if (!like) {
      res.status(404).json("Like doesn't exist");
    } else {
      const collection_id = like.collection_id;
      const collection = await Collection.findByPk(collection_id);
      let numLikes = collection.numLikes;
      await like.destroy();
      if (numLikes > 0) {
        await collection.update({
          numLikes: numLikes - 1,
        });
        await collection.reload();
        res.status(200).json({
          like: like,
          collection: collection,
        });
      }
    }
  } catch (err) {
    res.status(500).json("Error posting comment: " + err);
  }
});
module.exports = router;

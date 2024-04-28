const express = require("express");
const router = express.Router();
const Like = require("../models/Like");
const Collection = require("../models/Collection");

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
      res.status(404).json("No like found")
    }
    
  } catch (err) {
    res.status(500).json("Server error: "+err);
  }
});

router.get("/", async (req, res) => {
  try {
    const likes = await Like.findAll({
      attributes: ["like_id", "user_id", "collection_id"],
    });
    res.status(200).json(likes);
  } catch (err) {
    res.status(404).json("Couldn't find likes");
  }
});

router.post("/", async (req, res) => {
  try {
    const { collection_id, user_id } = req.body;
    const newLike = await Like.create({
      user_id: user_id,
      collection_id: collection_id,
    });
    console.log(newLike)
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

router.delete("/", async (req, res) => {
  try {
    const { collection_id, user_id } = req.query;
    console.log(collection_id)
    console.log(user_id)

    const like = await Like.findOne({
      where: {
        user_id: user_id,
        collection_id: collection_id
      }
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

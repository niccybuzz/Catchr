const express = require("express");
const Collection = require("../models/Collection");
const User = require("../models/User");
const Card = require("../models/Card");

const router = express.Router();

//Get single collection by ID
router.get("/:collectionid", async (req, res) => {
  try {
    const collectionId = req.params.collectionid;
    const foundCollection = await Collection.findByPk(collectionId, {
      attributes: ["collection_id", "collection_name", "user_id"],
      include: [
        {
          model: User,
          attributes: ["username", "user_id"],
        },
        {
          model: Card,
          attributes: ["card_name", "card_image"],
        },
      ],
    });

    if (!foundCollection) {
      res.status(404).json({ message: "Collection not found" });
    } else {
      res.status(200).json({
        message: "Collection found succesfully",
        collection: foundCollection,
      });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

//get all collections Route, with optional sorting and filtering
router.get("/", async (req, res) => {
  try {
    
    let { user_id, sortBy, sortOrder } = req.query;
    const whereClause = {};

    //option to sort by user id
    if (user_id) {
      whereClause.user_id = user_id;
    }
    //option to add ordering
    let orderClause = [];
    if (sortBy && sortOrder) {
      orderClause = [[sortBy, sortOrder]];
    }

    const collections = await Collection.findAll({
      where: whereClause,
      order: orderClause,
    });

    if (collections.length > 0) {
      res.status(200).json({
        message: "Collections retrieved Successfully",
        collections: collections,
      });
    } else {
      res.status(404).json({ message: "Can't find collections" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Update collection by collection ID
router.put("/", async (req, res) => {
  try {
    const collection_id = req.query.collection_id;
    const collection_name = req.body.collection_name;

    const collectToUpdate = await Collection.findByPk(collection_id);
    if (!collectToUpdate) {
      res.status(404).json({
        message: "Can't find that collection to update",
      });
    } else {
      await collectToUpdate.update({ collection_name: collection_name });
      await collectToUpdate.reload();
      res.status(201).json({
        message: "Collection updated succesfully",
        updatedCollection: collectToUpdate,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

  //Delete a collection
  router.delete("/", async (req, res) => {
    try {
      const collection_id = req.query.collection_id;
      const collectToDelete = await Collection.findByPk(collection_id);
      if (!collectToDelete) {
        res.status(404).json({
          message: "Can't find that collection",
        });
      } else {
        await collectToDelete.destroy();
        res.status(201).json({
          message: "Collection deleted successfully",
          deletedCollection: collectToDelete,
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


//Remove a card from a collection
router.delete("/addremove", async (req, res) => {
  try {
    const removecard = req.query.card_id;
    const collection_id = req.query.collection_id;

    const cardToRemove = await Card.findByPk(removecard);

    if (!cardToRemove) {
      res.status(400).json({
        message: "Cant find that card",
      });
    } else {
      const collectionToRemoveFrom = await Collection.findByPk(collection_id);
      if (!collectionToRemoveFrom) {
        res.status(400).json({
          message: "Cant find that collection",
        });
      } else {
        const isInThatCollection = await collectionToRemoveFrom.hasCard(
          cardToRemove
        );
        if (isInThatCollection) {
          await collectionToRemoveFrom.removeCard(cardToRemove);
          res.status(200).json({
            message: "Card removed successfully",
            cardRemoved: cardToRemove,
            collection: collectionToRemoveFrom,
          });
        } else {
          res.status(400).json({
            message: "That card isn't in that collection",
          });
        }
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Create new collection
router.post("/", async (req, res) => {
  try {
    const user_id = req.query.userid;
    const { collection_name } = req.body;
    const user = await User.findByPk(user_id);
    console.log(user);
    if (!user) {
      res.status(404).json({
        message: "Can't find that user",
      });
    } else {
      const newCollection = await Collection.create({
        collection_name,
        user_id,
      });

      if (newCollection) {
    
        res.status(201).json({
          message: "Collection created Successfully ",
          collection: newCollection,
        });
      } else {
        throw new Error("Error creating collection");
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Add a card to a collection
router.post("/addremove", async (req, res) => {
  try {
    const card_id = req.query.card_id;
    const collection_id = req.query.collection_id;

    const cardToAdd = await Card.findByPk(card_id);

    if (!cardToAdd) {
      res.status(404).json({
        message: "Can't find that card",
      });
    } else {
      const collectionToAddTo = await Collection.findByPk(collection_id);
      if (!collectionToAddTo) {
        res.status(404).json({
          message: "Can't find that collection",
        });
      } else {
        const isDuplicate = await collectionToAddTo.hasCard(cardToAdd);
        if (isDuplicate) {
          res.status(400).json({
            message: "That card is already in that collection",
          });
        } else {
          await collectionToAddTo.addCard(cardToAdd);
          res.status(200).json({
            message: "Card added to collection successfully",
            newEntry: cardToAdd,
            collection: collectionToAddTo,
          });
        }
      }
    }
  } catch (err) {
    res.status(500).json({
      message: `Server error: ${err.message}`,
    });
  }
});

module.exports = router;

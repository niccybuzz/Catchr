const express = require("express");
const Collection = require("../models/Collection");
const User = require("../models/User");
const Card = require("../models/Card");
const Category = require("../models/Category");
const Type = require("../models/Type");
const Set = require("../models/Set");
const Rarity = require("../models/Rarity");
const CardCollections = require("../models/many-to-many-files/CardCollection");
const authenticateJWT = require("../auth/authenticateJWT");

const router = express.Router();

//Remove a card from a collection
router.delete("/card", async (req, res) => {
  try {
    //Getting the specific card and collection to be modified
    const { card_id, collection_id } = req.body;
    //Find the card
    const cardToRemove = await Card.findByPk(card_id);

    if (!cardToRemove) {
      res.status(400).json("Cant find that card");
    } else {
      //Find the collection
      const collectionToRemoveFrom = await Collection.findByPk(collection_id);
      if (!collectionToRemoveFrom) {
        res.status(400).json("Cant find that collection");
      } else {
        // check the user privileges

        //Make sure that the card is actually in the collection. If it is, find the count
        const isInThatCollection = await collectionToRemoveFrom.hasCard(
          cardToRemove
        );
        if (isInThatCollection) {
          const cardcollection = await CardCollections.findOne({
            where: {
              CardCardId: card_id,
              CollectionCollectionId: collection_id,
            },
          });
          const numInCollection = cardcollection.numInCollection;
          if (numInCollection > 1) {
            await cardcollection.update({
              numInCollection: numInCollection - 1,
            });
            await cardcollection.reload();
            res
              .status(200)
              .json(
                "Card removed successfully. You now have " +
                  cardcollection.numInCollection +
                  " " +
                  cardToRemove.card_name +
                  "s in your collection."
              );
          } else {
            await collectionToRemoveFrom.removeCard(cardToRemove);
            await cardcollection.destroy();
            res.status(200).json("Card removed successfully");
          }
          // Remove the card if all criteria are met
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

// Add a card to a collection
router.post("/card", authenticateJWT, async (req, res) => {
  try {
    const { card_id, collection_id } = req.body;
    const cardToAdd = await Card.findByPk(card_id);
    
    if (!cardToAdd) {
      return res.status(404).json("Can't find that card");
    } else {
      const collectionToAddTo = await Collection.findByPk(collection_id);
      if (!collectionToAddTo) {
        return res.status(404).json("Can't find that collection");
      }
      
      // Verifiying the user has access to this collection
      if (req.user.id == collectionToAddTo.user_id || req.user.admin) {
        //checking if the card already exists in the collection. If so, incrementing the number rather than adding in duplicate data
        const isDuplicate = await collectionToAddTo.hasCard(cardToAdd);
        if (isDuplicate) {
          const cardcollection = await CardCollections.findOne({
            where: {
              CardCardId: card_id,
              CollectionCollectionId: collection_id,
            },
          });
          let numInCollection = cardcollection.numInCollection;
          await cardcollection.update({ numInCollection: numInCollection + 1 });
          await cardcollection.reload();
          
          res
            .status(200)
            .json(
              "Added another to the collection. You now have " +
                cardcollection.numInCollection +
                " " +
                cardToAdd.card_name +
                "s in your collection."
            );
        } else {
          // Add the card to the collection
          const cardAdded = await CardCollections.create({
            CardCardId: card_id,
            CollectionCollectionId: collection_id,
          });
          res
            .status(200)
            .json(
              "Card added to collection successfully You now have " +
                cardAdded.numInCollection +
                " " +
                cardToAdd.card_name +
                "s in your collection."
            );
        }
      } else {
        return res
          .status(401)
          .json("Not authorised to add a card to this collection");
      }
    }
  } catch (err) {
    return res.status(500).json("Server error: " + err.message);
  }
});

//Get single collection by ID
router.get("/:userid", async (req, res) => {
  try {
    const userid = req.params.userid;

    const foundCollection = await Collection.findOne({
      where: {
        user_id: userid,
      },
      attributes: ["collection_id", "user_id", "rating"],
      include: [
        {
          model: User,
          attributes: ["username", "user_id"],
        },
        {
          model: Card,
          attributes: ["card_id", "card_name", "card_image"],
          through: { where: {} }, // Include duplicates
          include: [
            {
              model: Category,
              attributes: ["category_id", "category_description"],
            },
            {
              model: Type,
              attributes: ["type_id", "type_description"],
            },
            {
              model: Set,
              attributes: ["set_id", "set_name", "no_of_cards"],
            },
            {
              model: Rarity,
              attributes: ["rarity_id", "rarity_description", "rarity_icon"],
            },
          ],
        },
      ],
    });

    if (!foundCollection) {
      res.status(404).json("Collection not found");
    } else {
      const cards = foundCollection.Cards;
      const stats = await getStats(cards);
      res.status(200).json({
        collection: foundCollection,
        stats: stats
      });
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

async function getStats(cards) {
  let uniqueCards = Object.keys(cards).length;
  let totalCards = 0;
  let shinies = 0;

  cards.forEach((card)=> {
    totalCards += card.CardCollection.numInCollection;
    if (card.Rarity.rarity_id > 4){
      shinies++
    }
  })
  return {uniqueCards, totalCards, shinies}
}

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
      include: [
        {
          model: User,
          attributes: ["username"]
        }
      ]
    });

    if (collections.length > 0) {
      res.status(200).json(collections);
    } else {
      res.status(404).json("Can't find collections");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update collection by collection ID
router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    //Getting collection ID from params and collection name from form input
    const collection_id = req.params.id;
    const collection_name = req.body.collection_name;

    //find the collection using sequelize
    const collectToUpdate = await Collection.findByPk(collection_id);
    if (!collectToUpdate) {
      res.status(404).json({
        message: "Can't find that collection to update",
      });
    } else {
      //Checking user privileges for updating that collection, then updating or rejecting
      if (req.user.id == collectToUpdate.user_id || req.user.admin) {
        await collectToUpdate.update({ collection_name: collection_name });
        await collectToUpdate.reload();
        res.status(201).json({
          message: "Collection updated succesfully",
          updatedCollection: collectToUpdate,
        });
      } else {
        res.status(401).json({
          message: "You don't have the privileges to update that collection",
        });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



//Delete a collection
router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    //Find the collection specified in the params
    const collection_id = req.params.id;
    const collectToDelete = await Collection.findByPk(collection_id);
    if (!collectToDelete) {
      res.status(404).json({
        message: "Can't find that collection",
      });
    } else {
      //checking user privileges and either destroying or rejecting request
      if (req.user.id == collectToDelete.user_id || req.user.admin) {
        await collectToDelete.destroy();
        res.status(201).json({
          message: "Collection deleted successfully",
          deletedCollection: collectToDelete,
        });
      } else {
        req.status(401).json({
          message: "Not authorised",
        });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

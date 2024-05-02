const express = require("express");
const Wishlist = require("../models/Wishlist");
const User = require("../models/User");
const Card = require("../models/Card");
const Category = require("../models/Category");
const Type = require("../models/Type");
const Set = require("../models/Set");
const Rarity = require("../models/Rarity");
const CardWishlist = require("../models/many-to-many-files/CardWishlist");
const authenticateJWT = require("../auth/authenticateJWT");

const router = express.Router();

//Remove a card from a wishlist
router.delete("/card", authenticateJWT, async (req, res) => {
  try {
    //Getting the specific card and wishlist to be modified
    const { card_id, wishlist_id } = req.body;
    //Find the card
    const cardToRemove = await Card.findByPk(card_id);

    if (!cardToRemove) {
      res.status(400).json("Cant find that card");
    } else {
      //Find the wishlist
      const wishlistToRemoveFrom = await Wishlist.findByPk(wishlist_id);
      if (!wishlistToRemoveFrom) {
        res.status(400).json("Cant find that wishlist");
      } else {
        // check the user privileges
        if (req.user.id == wishlistToRemoveFrom.user_id || req.user.admin) {
          //Make sure that the card is actually in the wishlist. If it is, find the count
          const isInThatwishlist = await wishlistToRemoveFrom.hasCard(
            cardToRemove
          );
          if (isInThatwishlist) {
            const cardwishlist = await CardWishlist.findOne({
              where: {
                CardCardId: card_id,
                WishlistWishlistId: wishlist_id,
              },
            });

            await wishlistToRemoveFrom.removeCard(cardToRemove);
            await cardwishlist.destroy();
            res.status(200).json("Card removed successfully");

            // Remove the card if all criteria are met
          } else {
            res.status(400).json("That card isn't in that wishlist");
          }
        } else {
          res.status(401).json("Not authorized to modify that wishlist");
        }
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a card to a wishlist
router.post("/card", authenticateJWT, async (req, res) => {
  try {
    const { card_id, wishlist_id } = req.body;
    const cardToAdd = await Card.findByPk(card_id);

    if (!cardToAdd) {
      return res.status(404).json("Can't find that card");
    } else {
      const wishlistToAddTo = await Wishlist.findByPk(wishlist_id);
      if (!wishlistToAddTo) {
        return res.status(404).json("Can't find that wishlist");
      }

      // Verifiying the user has access to this wishlist
      if (req.user.id == wishlistToAddTo.user_id || req.user.admin) {
        //checking if the card already exists in the wishlist. If so, incrementing the number rather than adding in duplicate data
        const isDuplicate = await wishlistToAddTo.hasCard(cardToAdd);
        if (isDuplicate) {
          res.status(400).json("You already have that card in your wishlist");
        } else {
          // Add the card to the wishlist
          const cardAdded = await CardWishlist.create({
            CardCardId: card_id,
            WishlistWishlistId: wishlist_id,
          });
          res.status(200).json("Card added to wishlist");
        }
      } else {
        return res
          .status(401)
          .json("Not authorised to add a card to this wishlist");
      }
    }
  } catch (err) {
    return res.status(500).json("Server error: " + err.message);
  }
});

//Get single wishlist by ID
router.get("/user/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const foundWishlist = await Wishlist.findOne({
      where: {
        user_id: user_id,
      },
      
      attributes: ["wishlist_id", "user_id"],
      include: [
        {
          model: User,
          attributes: ["username", "user_id"],
        },
        {
          model: Card,
          attributes: ["card_id", "card_name", "card_image"],
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

    if (!foundWishlist) {
      res.status(404).json("Wishlist not found");
    } else {
      res.status(200).json(foundWishlist);
    }
  } catch (err) {
    res.status(404).json("Server error: "+err);
  }
});

//Get single wishlist by ID
router.get("/:wishlist_id", async (req, res) => {
  try {
    const wishlistid = req.params.wishlist_id;
    const foundWishlist = await Wishlist.findByPk(wishlistid, {
      attributes: ["wishlist_id", "user_id"],
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

    if (!foundWishlist) {
      res.status(404).json("Wishlist not found");
    } else {
      res.status(200).json(foundWishlist);
    }
  } catch (err) {
    res.status(404).json(err);
  }
});

//get all wishlists Route, with optional sorting and filtering
router.get("/", async (req, res) => {
  try {
    let { sortBy, sortOrder, page, limit } = req.query;
    const whereClause = {};

    //Need to do this or it bugs out

    limit = parseInt(limit);
    page = parseInt(page);
    //setting default parameters for pagination if not passed by the user
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    //option to add ordering
    let orderClause = [];
    if (sortBy && sortOrder) {
      orderClause = [[sortBy, sortOrder]];
    }

    const wishlists = await Wishlist.findAll({
      offset: (page - 1) * 10,
      limit: limit,
      where: whereClause,
      order: orderClause,
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    let totalCount = await Wishlist.count({
      where: whereClause,
    });
    const totalPages = Math.ceil(totalCount / limit);

    if (wishlists.length > 0) {
      res.status(200).json({
        wishlists: wishlists,
        paginations: {
          page: page,
          limit: limit,
          totalCount: totalCount,
          totalPages: totalPages,
        },
      });
    } else {
      res.status(404).json("Can't find wishlists");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete a wishlist
router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    //Find the wishlist specified in the params
    const wishlist_id = req.params.id;
    const collectToDelete = await Wishlist.findByPk(wishlist_id);
    if (!collectToDelete) {
      res.status(404).json({
        message: "Can't find that wishlist",
      });
    } else {
      //checking user privileges and either destroying or rejecting request
      if (req.user.id == collectToDelete.user_id || req.user.admin) {
        await collectToDelete.destroy();
        res.status(201).json({
          message: "Wishlist deleted successfully",
          deletedWishlist: collectToDelete,
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

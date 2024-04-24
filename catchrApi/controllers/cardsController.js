const express = require("express");
const { Op } = require("sequelize");
const Card = require("../models/Card");
const Category = require("../models/Category");
const Type = require("../models/Type");
const Set = require("../models/Set");
const Ability = require("../models/Ability");
const Illustrator = require("../models/Illustrator");
const Fineprint = require("../models/Fineprint");
const Rarity = require("../models/Rarity");
const cacheChecker = require("../cache/cacheChecker");
const cache = require("../cache/cache");

const router = express.Router();

// Get method for all cards. Features basic caching of data
router.get("/", cacheChecker, async (req, res) => {
  try {
    //filtering, sorting and pagination parameters

    let {
      card_name,
      set_id,
      category_id,
      type_id,
      sortBy,
      sortOrder,
      page,
      limit,
      rarity_id,
    } = req.query;

    limit = parseInt(limit);

    //setting default parameters for pagination if not passed by the user
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }
    // creating filtering and sorting clauses
    const whereClause = {};
    if (card_name) {
      whereClause.card_name = { [Op.like]: `%${card_name}%` };
    }
    if (set_id) {
      whereClause.set_id = set_id;
    }
    if (category_id) {
      whereClause.category_id = category_id;
    }
    if (type_id) {
      whereClause.type_id = type_id;
    }
    if (rarity_id) {
      whereClause.RarityRarityId = rarity_id;
    }

    let orderClause = [];

    //if the user provides a sort method and order, send that. Otherwise, set to a default option
    if (sortBy && sortOrder) {
      //Need to do this because rarity is a foreign key
      if (sortBy === "rarity") {
        orderClause = [[{ model: Rarity }, "rarity_id", sortOrder]];
      } else {
        orderClause = [[sortBy, sortOrder]];
      }
      // e.g., [['createdAt', 'DESC']]
    } else {
      orderClause = [["card_set_number", "asc"]];
    }
    /**
     * Searching for the cards, with pagination limits, filtering and sorting options
     * Including all my forein key tables for abiities, set, type, etc
     * Offset starts at 0, and increases by limit (default 10) whenever a user goes to next page
     * Sends the customised where and sort clauses, and includes all forgein keys
     */
    let allCards = await Card.findAll({
      offset: (page - 1) * limit,
      limit: limit,
      where: whereClause,
      order: orderClause,
      attributes: ["card_id", "card_name", "card_set_number", "card_image"],
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
    });

    // Getting the total number of cards in the database to use for pagination
    let totalCount = await Card.count({
      where: whereClause, 
    });
    // and the number of total pages of cards depending on the limit set
    const totalPages = Math.ceil(totalCount / limit);

    // Getting the original url (/api/cards) for caching
    const cacheKey = req.originalUrl;
    // Storing data in the cache for the URL called on the get request (/api/cards)
    cache[cacheKey] = {
      cards: allCards,
      paginations: {
        page: page,
        limit: limit,
        totalCount: totalCount,
        totalPages: totalPages,
      },
    };

    // Setting the last request timestamp to now for comparison in the cache middleware
    req.lastRequestTimestamp = Date.now();

    //responding with all cards
    res.status(200).json(cache[cacheKey]);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Get a single card by ID. returns a more detailed list of attributes and abilities
 */ 
router.get("/:card_id", async (req, res) => {
  let card_id = req.params.card_id;

  try {
    let card = await Card.findByPk(card_id, {
      attributes: [
        "card_id",
        "card_name",
        "card_set_number",
        "hp",
        "card_image",
        "height_weight",
        "weakness_amount",
        "resistance_amount",
        "retreat_cost",
        "card_description"
      ],
      include: [
        {
          model: Ability,
          attributes: [
            "ability_name",
            "ability_damage",
            "ability_description",
            "primary_cost",
            "primary_type_id",
            "secondary_cost",
            "secondary_type_id",
            "pokemon_power",
          ],
          include: [
            {
              model: Type,
              as: "primary_type",
              attributes: ["type_id", "type_description", "type_icon"],
            },
            {
              model: Type,
              as: "secondary_type",
              attributes: ["type_id", "type_description", "type_icon"],
            },
          ],
        },
        {
          model: Category,
          attributes: ["category_id", "category_description"],
        },
        {
          model: Type,
          attributes: ["type_id", "type_description", "type_icon"],
        },
        {
          model: Type,
          as: "weakness_type",
          attributes: ["type_id", "type_description", "type_icon"],
        },
        {
          model: Type,
          as: "resistance_type",
          attributes: ["type_id", "type_description", "type_icon"],
        },
        {
          model: Type,
          as: "retreat_type",
          attributes: ["type_id", "type_description", "type_icon"],
        },
        {
          model: Set,
          attributes: ["set_id", "set_name", "no_of_cards"],
        },
        {
          model: Rarity,
          attributes: ["rarity_id", "rarity_description", "rarity_icon"],
        },
        {
          model: Fineprint,
          attributes: ["fineprint_text"],
        },
        {
          model: Illustrator,
          attributes: ["illustrator_name"],
        },
      ],
    });
    if (card) {
      res.status(200).json(card);
    } else {
      res.status(404).json("Can't find that card by id");
    }
  } catch (err) {
    res.status(500).json("Server error: " + err);
  }
});

module.exports = router;

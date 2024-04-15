const express = require("express");
const Card = require("../models/Card");
const Category = require("../models/Category");
const Type = require("../models/Type");
const Set = require("../models/Set");
const Ability = require("../models/Ability");
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
    } = req.query;

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
      whereClause.card_name = card_name;
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

    let orderClause = [];
    if (sortBy && sortOrder) {
      orderClause = [[sortBy, sortOrder]]; // e.g., [['createdAt', 'DESC']]
    }
    // Searching for the cards, with pagination limits, filtering and sorting options
    // Including all my forein key tables for abiities, set, type, etc
    let allCards = await Card.findAll({
      offset: (page - 1) * limit,
      limit: limit,
      where: whereClause,
      order: orderClause,
      attributes: [
        "card_id",
        "card_name",
        "card_set_number",
        "hp",
        "card_image",
        "height_weight",
      ],
      // Joining tables for abilities, category, type, set etc
      include: [
        {
          model: Ability,
          attributes: [
            "ability_name",
            "ability_description",
            "ability_damage",

            "primary_cost",
            "secondary_cost",
          ],
          include: [
            {
              model: Type,
              as: "AbilityTypes", // Alias for primary type
              attributes: ["type_description"],
              through: { attributes: [] },
            },
          ],
        },
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
      ],
    });

    // Getting the total number of cards in the database to use for pagination
    const totalCount = await Card.count();
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
    res.json({
      message: "All cards",
      data: cache[cacheKey],
    });
  } catch (error) {
    res.json(error);
  }
});

// Get a single user by ID
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
      ],
      include: [
        {
          model: Ability,
          attributes: [
            "ability_name",
            "ability_description",
            "ability_damage",

            "primary_cost",
            "secondary_cost",
          ],

          attributes: [
            "ability_name",
            "ability_damage",
            "primary_cost",
            "secondary_cost",
          ],
          include: [
            {
              model: Type,
              as: "AbilityTypes", // Alias for primary type
              attributes: ["type_description"],
              through: { attributes: [] },
            },
          ],
        },
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
      ],
    });
    if (card) {
      res.status(200).json({ message: "Card found succesfully", card: card });
    } else {
      res.status(404).json({ message: "Can't find that card by id" });
    }
  } catch {
    res.status(500).json("Server error");
  }
});

module.exports = router;

const express = require("express");
const Card = require("../models/Card");
const Category = require("../models/Category");
const Type = require("../models/Type");
const Set = require("../models/Set");
const Ability = require("../models/Ability");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let { card_name, set_id, category_id, type_id, sortBy, sortOrder } =
      req.query;
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
    // Construct the order clause for sorting
    let orderClause = [];
    if (sortBy && sortOrder) {
      orderClause = [[sortBy, sortOrder]]; // e.g., [['createdAt', 'DESC']]
    }
    let allCards = await Card.findAll({
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
    res.json(allCards);
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

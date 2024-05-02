const express = require("express");
const Set = require("../models/Set");
const Series = require("../models/Series");
const Card = require("../models/Card");
const Illustrator = require("../models/Illustrator");
const Type = require("../models/Type");
const Rarity = require("../models/Rarity");
const Ability = require("../models/Ability");
const Fineprint = require("../models/Fineprint");
const cache = require("../cache/cache");
const cacheChecker = require("../cache/cacheChecker");
const updateCache = require("../cache/updateCache");

const router = express.Router();

//Gets all expansions (sets)
//Has a cache
router.get("/sets", cacheChecker, async (req, res) => {
  try {
    const allSets = await Set.findAll({
      attributes: ["set_id", "set_name", "no_of_cards"],
      include: [
        {
          model: Series,
          attributes: ["series_name", "series_id"],
        },
      ],
    });
    const cacheKey = req.originalUrl;
    cache[cacheKey] = allSets
    res.status(200).json(cache[cacheKey]);
  } catch (err) {
    res.status(404).json("Couldn't find sets");
  }
});

//Gets all rarities. Has a cache
router.get("/rarities", cacheChecker, async (req, res) => {
  try {
    const rarities = await Rarity.findAll({
      attributes: ["rarity_id", "rarity_description", "rarity_icon"]
    });
    const cacheKey = req.originalUrl;
    cache[cacheKey] = rarities
    res.status(200).json(cache[cacheKey])
  } catch (err) {
    res.status(404).json("Couldn't find rarities")
  }
});

//Gets all types. Has a cacahe
router.get("/types", cacheChecker, async (req, res) => {
  try {
    const types = await Type.findAll({
      attributes: ["type_id", "type_description", "type_icon"]
    });
    const cacheKey = req.originalUrl;
    cache[cacheKey] = types
    res.status(200).json(cache[cacheKey])
  } catch (err) {
    res.status(404).json("Couldn't get types")
  }
});

//Post a new rarity. Updates rarity cache
router.post("/rarities", updateCache, async (req, res) => {
  try {
    const rarity = req.body.rarity_description;
    const rarityIcon = req.body.rarity_icon;

    const newRarity = await Rarity.create({
      rarity_description: rarity,
      rarity_icon: rarityIcon,
    });

    console.log("New Rarity created:");

    res.status(201).json("Rarity created successfully");
  } catch (err) {
    console.error("Error creating Rarity:", err);
    res.status(500).json("Server error");
  }
});


module.exports = router;

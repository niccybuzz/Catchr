const express = require("express");
const Set = require("../models/Set");
const Series = require("../models/Series");
const Illustrator = require("../models/Illustrator");
const Rarity = require("../models/Rarity");
const Ability = require("../models/Ability");
const Fineprint = require("../models/Fineprint");

const router = express.Router();

router.get("/sets", async (req, res) => {
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
    res.status(200).json({
      message: "Sets found",
      sets: allSets,
    });
  } catch (err) {
    res.status(404).json({
      message: "Couldn't find sets",
    });
  }
});

router.post("/illustrators", async (req, res) => {
    try {
      const illustrator = req.body.illustrator;
      console.log("Received illustrator data:", illustrator);
  
      // Assuming Illustrator is your Sequelize model
      const newIllus = await Illustrator.create({
        illustrator_name: illustrator,
      });
  
      console.log("New Illustrator created:", newIllus);
  
      res.status(201).json("Illustrator created successfully");
    } catch (err) {
      console.error("Error creating Illustrator:", err);
      res.status(500).json("Server error");
    }
  });

  router.post("/fineprints", async (req, res) => {
    try {
      const fineprint = req.body.fineprint_text;
      console.log("Received fineprint data:", fineprint);
  
      // Assuming Illustrator is your Sequelize model
      const newFineprint = await Fineprint.create({
        fineprint_text: fineprint,
      });
  
      console.log("New fineprint created:", newFineprint);
  
      res.status(201).json("fineprint created successfully");
    } catch (err) {
      console.error("Error creating fineprint:", err);
      res.status(500).json("Server error");
    }
  });

  router.post("/rarities", async (req, res) => {
    try {
      const rarity = req.body.rarity_description;
      const rarityIcon = req.body.rarity_icon
      console.log("Received illustrator data:", rarity);

      console.log(rarity)
      console.log(rarityIcon)
  
      // Assuming Illustrator is your Sequelize model
      const newRarity = await Rarity.create({
        rarity_description: rarity,
        rarity_icon: rarityIcon
      });
  
      console.log("New Rarity created:");
  
      res.status(201).json("Rarity created successfully");
    } catch (err) {
      console.error("Error creating Rarity:", err);
      res.status(500).json("Server error");
    }
  });

  router.get("/abilities", async (req, res) => {
    try {
        const allAbilities = await Ability.findAll({
            attributes : ['ability_id', 'ability_name', 'ability_id', 'ability_damage',  'primary_cost', 'secondary_cost'],
            include: [
                {
                    model: Type,
                    as: 'AbilityTypes', // Alias for primary type
                    attributes: ['type_description'],
                    through: { attributes: [] } 
                },
                {
                    model: Card,
                    attributes: ['card_id', 'card_name']
                }
            ]
        });
        
        res.json(allAbilities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
  

module.exports = router;

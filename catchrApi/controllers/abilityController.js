const express = require("express");
const Ability = require("../models/Ability");
const Type = require("../models/Type");
const Card = require("../models/Card");


const router = express.Router();

router.get("/", async (req, res) => {
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

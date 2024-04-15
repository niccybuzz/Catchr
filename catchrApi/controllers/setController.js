const express = require("express");
const Card = require("../models/Card");
const Set = require("../models/Set");
const Series = require("../models/Series");

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const allSets = await Set.findAll({
            attributes : ['set_id', 'set_name', 'no_of_cards'],
            include : [{
                model: Series,
                attributes: [
                    'series_name', 'series_id'
                ]
            }]
            
        })
        res.status(200).json({
            message: "Sets found",
            sets: allSets
        })
    } catch (err) {
        res.status(404).json({
            message: "Couldn't find sets"
        })
    }
    
})


module.exports = router;
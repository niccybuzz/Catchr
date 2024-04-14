
const Card = require("../models/Card")
const Category = require("../models/Category")
const Type = require("../models/Type")
const Set = require("../models/Set")
const Ability = require("../models/Ability")

exports.getAllCards = async (req, res) => {
    try{
        let allCards = await Card.findAll({
            ///attributes: ['card_id', 'card_name'],
           include : Ability
        })
        res.json(allCards);
    } catch (error) {
        res.json(error);
    }
    
}
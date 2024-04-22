const express = require("express");
const router = express.Router();
const axios = require("axios");

// Get request for a specific card
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let sessionObj = req.session;
    let endp = `http://localhost:4000/api/cards/${id}`;
    console.log(endp);
    const results = await axios.get(endp);
    if (results) {
      let card = results.data;
      if (card.Abilities.length > 0) {
        // Loading all card details into the card object for easier reading the html
        if (card.Abilities[0].primary_cost !== null) {
          card.ability1type1 = card.Abilities[0].primary_type.type_description;
          card.ability1cost1 = card.Abilities[0].primary_cost;
          card.ability1icon1 = card.Abilities[0].primary_type.type_icon;

          if (card.Abilities[0].secondary_cost !== null) {
            card.ability1type2 =
              card.Abilities[0].secondary_type.type_description;
            card.ability1cost2 = card.Abilities[0].secondary_cost;
            card.ability1icon2 = card.Abilities[0].secondary_type.type_icon;
          }
        }

        if (card.Abilities.length > 1) {
          if (card.Abilities[1].primary_cost !== null) {
            card.ability2type1 =
              card.Abilities[1].primary_type.type_description;
            card.ability2cost1 = card.Abilities[1].primary_cost;
            card.ability2icon1 = card.Abilities[1].primary_type.type_icon;
            if (card.Abilities[1].secondary_cost !== null) {
              card.ability2type2 =
                card.Abilities[1].secondary_type.type_description;
              card.ability2cost2 = card.Abilities[1].secondary_cost;
              card.ability2icon2 = card.Abilities[1].secondary_type.type_icon;
            }
          }
        }
      }

      if (card.weakness_amount > 0) {
        card.weakness_description = card.weakness_type.type_description;
        card.weakness_icon = card.weakness_type.type_icon;
        
      }
      if (card.resistance_type !== null) {
        card.resistance_description = card.resistance_type.type_description;
        card.resistance_icon = card.resistance_type.type_icon;
      }
      if (card.retreat_type !== null) {
        card.retreat_description = card.retreat_type.type_description;
        card.retreat_icon = card.retreat_type.type_icon;
      }

      res.render("singleCard", { card: card, user: sessionObj });
    }
  } catch (err) {
    
    res.redirect("/cards");
  }
});




//route for all cards
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sessionObj = req.session;
    
    const result = await getCards(page, limit)
    const cards = result.cards
    const pagination = result.pagination
    res.render("allcards", { cards: cards, user: sessionObj, pagination: pagination });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Function to fetch Pokémon cards from the API
async function getCards(page, limit) {
  const offset = (page - 1) * limit;
  const response = await axios.get(`http://localhost:4000/api/cards?page=${page}&limit=${limit}`);
  const cards = response.data.cards;
  console.log(cards)
  const currentPage = response.data.paginations.page;
  const totalPages = response.data.paginations.totalPages;
  const pagination = { currentPage, totalPages };
  return { cards, pagination };
}

//res.render("allcards", { cardData, user: sessionObj });

module.exports = router;

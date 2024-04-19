const express = require("express");
const router = express.Router();
const axios = require("axios");

// Get request for a specific card
router.get("/:id", async (req, res) => {
  try{
    let id = req.params.id;
    let sessionObj = req.session;
    let endp = `http://localhost:4000/api/cards/${id}`;
    console.log(endp)
    const results = await axios.get(endp);
    if (results){
      let card = results.data.card;
      res.render("singleCard", { card: card, user: sessionObj });
    }
  } catch (err){
    res.redirect("/cards")
  }
});

//route for all cards
router.get("/", async (req, res) => {
  try {
    const sessionObj = req.session;
    let endp = `http://localhost:4000/api/cards/`;
    const result = await axios.get(endp);
    const cards = result.data.cards;
    const pagination = result.data.pagination
    res.render("allcards", {cards:cards, user: sessionObj})
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//res.render("allcards", { cardData, user: sessionObj });

module.exports = router;

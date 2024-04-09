const express = require("express");
const router = express.Router();
const axios = require("axios");

//route for all cards
router.get("/", (req, res) => {
    let endp = `http://localhost:4000/allcards`;
  
    axios.get(endp).then((response) => {
      let cardData = response.data;
      res.render("allcards", { cardData });
    });
  });

module.exports = router;
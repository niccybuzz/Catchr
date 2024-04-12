const express = require("express");
const router = express.Router();
const axios = require("axios");

// Get request for a specific card
router.get("/:id", async (req, res) => {
  //Defining sorting login
  let id = req.params.id;
  
  let endp = `http://localhost:4000/api/cards/?id=${id}`;

  await axios
    .get(endp)
    .then((response) => {
      let cardData = response.data;
      console.log(cardData)
      res.render("singlecard", { card : cardData });
    })
    .catch((err) => {
      res.status(400).send("Bad request");
    });
});

//route for all cards
router.get("/", async (req, res) => {
  //Defining sorting login
  let sort = req.query.sortby;

  if (!sortby){
    sort = "cardnumber"
  }

  const sessionObj = req.session;

  //console.log(sessionObj.username);

  let endp = `http://localhost:4000/api/cards/?sort=${sort}`;

  await axios
    .get(endp)
    .then((response) => {
      let cardData = response.data;
      res.render("allcards", { cardData, user: sessionObj });
    })
    .catch((err) => {
      res.status(400).send("Bad request");
    });
});



module.exports = router;

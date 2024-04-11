const express = require("express");
const router = express.Router();
const axios = require("axios");


//route for all cards
router.get("/", async (req, res) => {
  const sessionObj = req.session;

  if (sessionObj.authen) {
    console.log(sessionObj.username);

    let endp = `http://localhost:4000/allcards`;

    await axios.get(endp).then((response) => {
      let cardData = response.data;
      res.render("allcards", { cardData, user: sessionObj});
    });

  } else {

    res.send("denied");
    
  }
});

module.exports = router;

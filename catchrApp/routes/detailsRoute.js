const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
    let id = req.query.id;
    const session = req.session;
    const endp = `http://localhost:4000/details/`;

    axios.get(endp, {params: {id : id}}).then((response) => {
        let cardData = response.data[0];
        console.log(cardData);
        res.render("cardDetails", {card : cardData, user: session})
    }).catch((err) => {
        res.send("unable to get card results");
    })

})

module.exports = router;
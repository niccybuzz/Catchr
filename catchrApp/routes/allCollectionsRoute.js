const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    if (req.session.authen) {
      const id = req.session.authen;
      console.log(id);
  
      let endp = "http://localhost:4000/allcollections";
  
      await axios
        .get(endp, { params: { id: id } }) // Pass id as a query parameter
        .then((response) => {
          let collections = response.data;
          res.render("allCollections", { collections });
        })
        .catch((err) => {
          res.status(401).send("Error");
        });
    } else {
      res.redirect("/login");
    }
  });
  

module.exports = router;

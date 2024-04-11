const express = require("express");
const router = express.Router();
const axios = require("axios");

let validaccount = true;

// get login page
router.get("/", (req, res) => {
  const sessionObj = req.session;
  validaccount = true;
  if (sessionObj.authen) {
    res.redirect("/allcards");
  } else {
    console.log("couldnt get to allCards from login get route");
    res.render("login", { validaccount: validaccount });
  }
});

//post new login request
router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //define user object, config, endpoint
  const user = {
    username: username,
    password: password,
  };

  const endp = `http://localhost:4000/login`;

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  // Send request to axios
  await axios
    .post(endp, user, config)
    .then((response) => {
      //loading the session into a variable
      const sessionObj = req.session;

      //adding authenticator key to our new object
      sessionObj.authen = response.data.user_id;

      // rendering home with the session id
      if (sessionObj.authen) {
        sessionObj.username = response.data.username;
        console.log(sessionObj.username);
        res.redirect("/");
      } else {
        console.log("user not logged in");
        validaccount = false;
        res.redirect("/login");
      }
    })
    .catch((err) => {
      res
        .status(401)
        .send("Authentication failed. Please check your credentials.");
    });
});

module.exports = router;

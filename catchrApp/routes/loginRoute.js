const express = require("express");
const router = express.Router();
const axios = require("axios");

let validaccount = true;

// get login page
router.get("/", (req, res) => {

  const sessionObj = req.session;
  console.log(sessionObj.authen);
  if (sessionObj.authen){
    res.redirect("allcards");
  } else {
    res.render("login", { accountvalid: validaccount, user:sessionObj});
  }

});

//post new login request
router.post("/", (req, res) => {
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
  axios
    .post(endp, user, config)
    .then((response) => {

      //console confirmation that we got a positive results
      console.log(response.data);

      //loading the session into a variable
      const sessionObj = req.session;

      //adding authenticator key to our new object
      sessionObj.authen = response.data.user_id;

      // rendering home with the session id
      if(sessionObj.authen){
        sessionObj.username = response.data.username;

        res.redirect("/allcards");
      }
      

    })
    .catch((err) => {
      if (err) {
        console.log("Username doesn't match");
        validaccount = false;
        res.render("login", { accountvalid: validaccount });
      }
    });
});

module.exports = router;

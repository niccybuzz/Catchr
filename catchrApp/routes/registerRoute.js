const express = require("express");
const router = express.Router();
const axios = require("axios");

let validpassword = true;

// get register page
router.get("/", (req, res) => {
  const sessionObj = req.session;
  if (sessionObj.authen) {
    res.redirect("allcards");
  } else {
    res.render("register", { validpassword: validpassword , user:sessionObj});
  }
});

// Posting new user to my API
router.post("/", (req, res) => {
  // Gettimg form data from request body
  let user = req.body.username;
  let useremail = req.body.email;
  let passw = req.body.password;
  let passw_con = req.body.password_confirmation;

  //Checking password and confirmation fields match
  if (passw !== passw_con) {
    validpassword = false;
    res.render("register", { validpassword: validpassword });
  }

  //object to send to the API for the new user
  const newUser = {
    username: user,
    email: useremail,
    password: passw,
  };

  // Setting configuration to allow app to parse url data
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  //defining endpoint (API)
  let endp = `http://localhost:4000/register`;

  //Post it!
  axios
    .post(endp, newUser, config)
    .then((response) => {
      req.session.enteredUsername = user;
      res.render("userCreated", { user: user });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

module.exports = router;

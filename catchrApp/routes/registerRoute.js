const express = require("express");
const router = express.Router();
const axios = require("axios");

let validpassword = true;

// get register page
router.get("/", (req, res) => {
  const sessionObj = req.session;
  if (sessionObj.authen) {
    res.redirect("/cards");
  } else {
    res.render("register", {validpassword: validpassword, user: sessionObj, message: "" });
  }
});

// Posting new user to my API
router.post("/", async (req, res) => {
  try{
    let user = req.session;
  // Gettimg form data from request body
  let username = req.body.username;
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
    username: username,
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
  let endp = `http://localhost:4000/api/users/register`;

  //Post it!
  const result = await axios.post(endp, newUser, config);
  
    res.render("userCreated", { user: username});
  } catch (err) {
    if (err.response && err.response.status == 400)  {
      res.render("register", {validpassword: validpassword, message: "An account with those credentials already exists.", user: req.session})
    } else {
      res.send("server error")
    }
  }

  
});

module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require("axios");
const redirectCards = require("../middleware/redirectCards");

// get login page
router.get("/", redirectCards, (req, res) => {
  const sessionObj = req.session;
  res.render("login", { message: "", user: sessionObj });
});

//post new login request
router.post("/", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const sessionObj = req.session;

    //define user object, config, endpoint
    const userdetails = {
      username: username,
      password: password,
    };
    const endp = `http://localhost:4000/api/users/login`;
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const result = await axios.post(endp, userdetails, config);
    
      const user = result.data.user;
      const authToken = result.data.token;
    
      sessionObj.user = user;
      sessionObj.authen = user.user_id;
      sessionObj.admin = user.admin;
      sessionObj.username = user.username;
      sessionObj.email = user.email_address
      sessionObj.authToken = authToken

      res.redirect("/cards");
  } catch (err) {
    if (err.response && err.response.status === 401) {
        // Handle incorrect password case
        console.log(err.response.data)
        return res.render("login", { message: err.response.data, user: req.session });
    } else if (err.response && err.response.status === 404) {
        // Handle other errors
        return res.render("login", { message: err.response.data, user: req.session });
        
    }
}
});

module.exports = router;

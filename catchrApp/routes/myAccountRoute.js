const express = require("express");
const router = express.Router();
const axios = require("axios");
const redirectLogin = require("../middleware/redirectLogin");

// Allows a user to update their username or email
router.post("/updatedetails", async (req, res) => {
  try {
    let sessionObj = req.session;
    const userid = req.session.authen;
    const admin = req.session.admin
    const { username, email, password } = req.body;
    const token = req.session.authToken
    const newDetails = {
      user_id : userid,
      new_username: username,
      new_email : email,
      admin : admin,
      password: password
    }

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token}`
      },
    };
    const endp = `http://localhost:4000/api/users/details`;
    const results = await axios.put(endp, newDetails, config);
    if (results) {
      let updatedDetails = results.data.updatedUser
      sessionObj.user = updatedDetails.user;
      sessionObj.authen = updatedDetails.user_id;
      sessionObj.admin = updatedDetails.admin;
      sessionObj.username = updatedDetails.username;
      sessionObj.email = updatedDetails.email_address
      console.log("Details updated succesfully")
      res.render("updateDetails", {updated:true, user: sessionObj})
      //res.render("updateDetails", {updated:true, user: sessionObj})
    }
  } catch (err) {
    console.log("Error updating details: " + err.data)
    res.render("updateDetails", {updated:false, user: req.session})
  }
});

router.post("/changepassword", async (req, res) => {
  try {
    const { oldpassword, newpassword, newpasswordConfirm } = req.body;
    const sessionObj = req.session;
    const userid = req.session.authen;
    const admin = req.session.admin
    const token = req.session.authToken
    
    if (!newpassword === newpasswordConfirm){
      res.render("/changepassword", {message: "Passwords don't match. Please enter again"})
    } 
    
    const newPassword = {
      oldpassword : oldpassword,
      newpassword: newpassword,
      user_id : userid
    }

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token}`
      },
    };
    const endp = `http://localhost:4000/api/users/changepassword`;
    const results = await axios.put(endp, newPassword, config);
    if (results) {
     
      console.log("Details updated succesfully")
      res.render("changepassword", {updated:true, user: sessionObj})
    }
  } catch (err) {
    console.log("Error updating details: " + err.data)
    res.render("changepassword", {updated:false, user: req.session, message: "There was an issue changing your password"})
  }
});

//Loads the page for changing password
router.get("/changepassword", redirectLogin, async (req, res) => {
  try {
    let user = req.session;
    res.render("changepassword", { user: user, updated:false });
  } catch (err) {
    res.redirect("/");
    console.log(err);
  }
});

//Loads the page for updating username and email
router.get("/updatedetails", redirectLogin, async (req, res) => {
  try {
    let user = req.session;
    res.render("updateDetails", { user: user, updated:false });
  } catch (err) {
    res.redirect("/");
    console.log(err);
  }
});

// Loads my account page
router.get("/", redirectLogin, async (req, res) => {
  try {
    let user = req.session;
    console.log(user);

    res.render("myaccount", { user: user });
  } catch (err) {
    res.redirect("/")
  }
});



module.exports = router;

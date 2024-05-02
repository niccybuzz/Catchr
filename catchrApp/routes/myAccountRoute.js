const express = require("express");
const router = express.Router();
const axios = require("axios");
const redirectLogin = require("../middleware/redirectLogin");

//Deletes a user's account
router.delete("/delete", redirectLogin, async (req, res)=> {
  try{
    const user_id = req.session.authen
    const token = req.session.authToken
    console.log(token)
    const endp = `http://localhost:4000/api/users/delete/${user_id}`
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token}`
      },
    };
    const deletedAccount = await axios.delete(endp, config);
    req.session.destroy();
    res.status(200).json(deletedAccount.data)
  } catch (err) {
    console.log(err.response.data)
    res.render("error", {error: err, user: req.session})
  }
})

// Allows a user to update their username or email
router.post("/updatedetails", redirectLogin, async (req, res) => {
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
      res.render("updateDetails", {updated:true, user: sessionObj})
    }
  } catch (err) {
    console.log("Error updating details: " + err.data)
    res.render("updateDetails", {updated:false, user: req.session})
  }
});

router.post("/changepassword", redirectLogin, async (req, res) => {
  try {
    const { oldpassword, newpassword, newpasswordConfirm } = req.body;
    const sessionObj = req.session;
    const userid = req.session.authen;
    const token = req.session.authToken
    
    if (newpassword !== newpasswordConfirm){
      res.render("changepassword", {message: "Passwords don't match. Please enter again", user: sessionObj, updated:false})
      return;
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
    const endp = `http://localhost:4000/api/users/password`;
    const results = await axios.put(endp, newPassword, config);
    if (results) {
      res.render("changepassword", {updated:true, user: sessionObj})
    }
  } catch (err) {
    console.log("Error updating details: " + err.response.data)
    res.render("changepassword", {updated:false, user: req.session, message: err.response.data})
  }
});

//Loads the page for changing password
router.get("/changepassword", redirectLogin, async (req, res) => {
  try {
    let user = req.session;
    res.render("changepassword", { user: user, updated:false, message: "" });
  } catch (err) {
    res.redirect("/");
    console.log(err);
  }
});

//Loads the page for updating username and email
router.get("/mylikes", redirectLogin, async (req, res) => {
  try {
    let user = req.session;
    const result = await axios.get(`http://localhost:4000/api/likes/user/${user.authen}`)
    const myLikes = result.data
    res.render("mylikes", { user: user,  likes: myLikes });
  } catch (err) {
    res.render("error", {error: err, user: req.session})
  }
});

//Loads the page for updating username and email
router.get("/mycomments", redirectLogin, async (req, res) => {
  try {
    let user = req.session;
    const result = await axios.get(`http://localhost:4000/api/comments/user/${user.authen}`)
    const myComments = result.data
    res.render("mycomments", { user: user,  comments: myComments });
  } catch (err) {
    res.render("error", {error: err, user: req.session})
  }
});


//Loads the page for updating username and email
router.get("/updatedetails", redirectLogin, async (req, res) => {
  try {
    let user = req.session;
    res.render("updateDetails", { user: user, updated:false, message:"" });
  } catch (err) {
    res.render("error", {error: err, user: req.session})
  }
});

// Loads my account page
router.get("/", redirectLogin, async (req, res) => {
  try {
    let user = req.session;
    res.render("myaccount", { user: user });
  } catch (err) {
    res.redirect("/")
  }
});



module.exports = router;

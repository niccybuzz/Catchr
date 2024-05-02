const express = require("express");
const router = express.Router();
const axios = require("axios");
const authenticateAdmin = require("../middleware/authenticateAdmin")

//Allows an admin to see all users on the site
router.get("/users", authenticateAdmin, async (req, res) => {
  try {
    const allUsers = await axios.get(`http://localhost:4000/api/users`);
    res.render("adminPanelUsers", { users: allUsers.data, user: req.session });
  } catch (err) {
    console.log(err);
    res.render("error", { error: err, user: req.session });
  }
});

//Allows an admin to delete a user from the site
router.delete("/users/delete/:user_id", authenticateAdmin, async (req, res) => {
  try {
    console.log("triggered")
    const token = req.session.authToken;
    const config = {
      headers: {
        Authorization: `Bearer: ${token}`,
      },
    };
    const userToDelete = req.params.user_id;
    console.log(userToDelete)
    const endp = `http://localhost:4000/api/users/${userToDelete}`;
    const deletedUser = await axios.delete(endp, config);
    res.status(200).json("Account deleted successfully")
  } catch (err) {
    console.log(err.response.data);
    res.render("error", { error: err, user: req.session });
  }
});

//Allows an admin to delete a comment
router.get("/comments/delete/:comment_id", authenticateAdmin, async (req, res) => {
  try {
    const token = req.session.authToken;
    const config = {
      headers: {
        Authorization: `Bearer: ${token}`,
      },
    };
    const commentToDelete = req.params.comment_id;
    const endp = `http://localhost:4000/api/comments/${commentToDelete}`;
    await axios.delete(endp, config);
    res.redirect("/admin/comments");
  } catch (err) {
    console.log(err.response.data);
    res.render("error", { error: err, user: req.session });
  }
});

router.get("/comments", authenticateAdmin, async (req, res) => {
  try {
    const allComments = await axios.get(`http://localhost:4000/api/comments`);
    console.log(allComments.data);
    res.render("adminPanelComments", {
      comments: allComments.data,
      user: req.session,
    });
  } catch (err) {
    console.log(err);
    res.render("error", { error: err, user: req.session });
  }
});

router.get("/", (req, res) => {
  const user = req.session;
  res.render("adminPanel", { user: user });
});

module.exports = router;

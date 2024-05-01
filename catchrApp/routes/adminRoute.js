const express = require("express");
const router = express.Router();
const axios = require("axios")

router.get("/users", async (req, res) => {
    try {
        
        const allUsers = await axios.get(`http://localhost:4000/api/users`)
        res.render("adminPanelUsers", {users: allUsers.data, user:req.session})
    } catch (err) {
        console.log(err)
        res.render("error", {error: err, user:req.session})
    }
})

router.get("/users/delete/:user_id", async (req, res) => {
    try {
        const token = req.session.authToken
        const config = {
            headers: {
                "Authorization" : `Bearer: ${token}`
            }
        }
        const userToDelete = req.params.user_id
        const endp = `http://localhost:4000/api/users/${userToDelete}`;
        const deletedUser = await axios.delete(endp, config)
        res.redirect("/admin/users")
    } catch (err) {
        console.log(err.response.data)
        res.render("error", {error: err, user:req.session})
    }
})

router.get("/", (req, res) => {
    const user = req.session
    res.render("adminPanel", {user: user})
})

module.exports = router;
const express = require("express");
const router = express.Router();
const axios = require("axios");
const redirectLogin = require("../middleware/redirectLogin");

router.get("/:id", redirectLogin, (req, res) => {
    const user_id = req.session.user_id
})

module.exports = router;
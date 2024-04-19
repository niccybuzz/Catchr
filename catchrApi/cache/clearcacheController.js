const express = require("express");
const router = express.Router();
const clearCache = require ("./clearcache")

router.get("/", (req, res) => {
    clearCache();
    console.log("Cache cleared")
    res.send("Cache cleared")
})

module.exports = router;
const express = require("express");
const CardController = require("../controllers/cardController");

const router = express.Router();

router.get("/", CardController.getAllCards);


module.exports = router;

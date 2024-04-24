const express = require("express");
const router = express.Router();

const homeRoute = require("./homeRoute.js");
const cardsRoute = require("./cardsRoute.js");
const registerRoute = require("./registerRoute.js");
const loginRoute = require("./loginRoute.js");
const logoutRoute = require("./logoutRoute.js");
const createCollecRoute = require("./createCollectionRoute.js");
const myCollecRoute = require("./myCollectionRoute.js");
const myAccountRoute = require("./myAccountRoute.js");
const addToCollectionRoute = require("./addToCollectionRoute.js");

router.use("/cards", cardsRoute);
router.use("/createcollection", createCollecRoute);
router.use("/addtocollection", addToCollectionRoute);
router.use("/mycollection", myCollecRoute);
router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);
router.use("/myaccount", myAccountRoute);
router.use("/", homeRoute);


module.exports = router;
/**
 * "Pinches" all the other routes into 1, for readability
 */

const express = require("express");
const router = express.Router();

const homeRoute = require("./homeRoute.js");
const cardsRoute = require("./cardsRoute.js");
const registerRoute = require("./registerRoute.js");
const loginRoute = require("./loginRoute.js");
const logoutRoute = require("./logoutRoute.js");
const myCollecRoute = require("./myCollectionRoute.js");
const myWishlistRoute = require("./wishlistRoute.js");
const collectionsRoute = require("./collectionsRoute.js");
const myAccountRoute = require("./myAccountRoute.js");
const adminRoute = require("./adminRoute.js");

router.use("/cards", cardsRoute);
router.use("/mycollection", myCollecRoute);
router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);
router.use("/myaccount", myAccountRoute);
router.use("/collections", collectionsRoute);
router.use("/mywishlist", myWishlistRoute);
router.use("/admin", adminRoute);
router.use("/", homeRoute);


module.exports = router;
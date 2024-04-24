const express = require("express");
const mainRouter = express.Router();

const cardsController = require("./cardsController");
const collectionsController = require("./collectionsController")
const usersController = require("./usersController")
const otherController = require("./otherController")
const clearCacheController = require("../cache/clearcacheController")

mainRouter.use("/api/cards", cardsController);
mainRouter.use("/api/collections", collectionsController);
mainRouter.use("/api/users", usersController);
mainRouter.use("/api/others", otherController);
mainRouter.use("/api/clearcache", clearCacheController);


module.exports = mainRouter;
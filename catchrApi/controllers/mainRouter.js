const express = require("express");
const mainRouter = express.Router();

const cardsController = require("./cardsController");
const collectionsController = require("./collectionsController")
const wishlistController = require("./wishlistController")
const usersController = require("./usersController")
const otherController = require("./otherController")
const clearCacheController = require("../cache/clearcacheController")
const commentsController = require("./commentsController")
const likesController = require("./likesController")

mainRouter.use("/api/cards", cardsController);
mainRouter.use("/api/collections", collectionsController);
mainRouter.use("/api/wishlists", wishlistController);
mainRouter.use("/api/users", usersController);
mainRouter.use("/api/others", otherController);
mainRouter.use("/api/clearcache", clearCacheController);
mainRouter.use("/api/comments", commentsController);
mainRouter.use("/api/likes", likesController);


module.exports = mainRouter;
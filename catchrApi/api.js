/*
* Starting point for RestAPI
* Accepts and returns JSON data along with revelent status codes
*/
//require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const sequelize = require("./config/database");
const associations = require("./models/Associations")


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importing routes
const cardsController = require("./controllers/cardsController");
const collectionsController = require("./controllers/collectionsController")
const usersController = require("./controllers/usersController")
const abilityController = require("./controllers/abilityController")
const setController = require("./controllers/setController")
app.use("/api/cards", cardsController);
app.use("/api/collections", collectionsController);
app.use("/api/users", usersController);
app.use("/api/abilities", abilityController);
app.use("/api/sets", setController);

sequelize.authenticate().then((response) => {
  console.log("Connected to db");
})

sequelize.sync().then((response) => {
  console.log("Database synced")
  console.log(sequelize.models)
})


// Setting port number and view enging
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`API started on port ${server.address().port}`);
});

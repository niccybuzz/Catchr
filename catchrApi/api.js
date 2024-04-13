/*
* Starting point for RestAPI
* Accepts and returns JSON data along with revelent status codes
*/
//require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const sequelize = require("./config/database");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importing routes
const cardsRoute = require("./routes/cardsRoute");
const collectionsRoute = require("./routes/collectionsRoute")
const usersRoute = require("./routes/usersRoute")
app.use("/api/cards", cardsRoute);
app.use("/api/collections", collectionsRoute);
app.use("/api/users", usersRoute);

// Setting port number and view enging
const PORT = process.env.PORT || 4000;

sequelize.sync({force : false}).then((response) => {
  console.log("Database synced")
  console.log(sequelize.models)
})


const server = app.listen(PORT, () => {
  console.log(`API started on port ${server.address().port}`);
});

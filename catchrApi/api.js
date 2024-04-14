/*
* Starting point for RestAPI
* Accepts and returns JSON data along with revelent status codes
*/
require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connectionPool = require("./db");

// Setting port number and view enging
const PORT = process.env.PORT || 4000;

// Importing routes
const cardsRoute = require("./routes/cardsRoute");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
const collectionsRoute = require("./routes/collectionsRoute")

app.use("/api/cards", cardsRoute);
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/collections", collectionsRoute);

const server = app.listen(PORT, () => {
  console.log(`API started on port ${server.address().port}`);
});

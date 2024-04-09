// Dependencies and set
require("dotenv").config();
const express = require("express");

const connectionPool = require("./db");

const app = express();
app.use(express.urlencoded({ extended: true }));

// Setting port number and view enging
const PORT = process.env.PORT || 4000;

// Importing routes
const allcardsRoute = require("./routes/allcardsRoute");
app.use("/allcards", allcardsRoute);

const registerRoute = require("./routes/registerRoute");
app.use("/register", registerRoute);

const server = app.listen(PORT, () => {
  console.log(`API started on port ${server.address().port}`);
});

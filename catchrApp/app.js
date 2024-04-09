// Main express app
const express = require("express");
const ejs = require("ejs");
const app = express();
const path = require("path");

//serving static files and config for url encoded forms
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.urlencoded({ extended: true }));

//setting view engine and views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// setting routes
const homeRoute = require("./routes/homeRoute.js");
const allcardsRoute = require("./routes/allcardsRoute.js");
const registerRoute = require("./routes/registerRoute.js");
const loginRoute = require("./routes/loginRoute.js");

app.use("/", homeRoute);
app.use("/allcards", allcardsRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);

//exporting app to the server
module.exports = app;

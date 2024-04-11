// Main express app
const express = require("express");
const ejs = require("ejs");
const app = express();
const path = require("path");

// Sessions stuff for login route
const cookieParser = require('cookie-parser');
const session = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;

app.use(cookieParser());

app.use(session({
   secret: "mysecretkey1832765",
   saveUninitialized: false,
   cookie: { 
    maxAge: oneDay,
    sameSite: true
  },
   resave: false
}));

//serving static files and config for url encoded forms
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setting view engine and views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// setting routes
const homeRoute = require("./routes/homeRoute.js");
const allcardsRoute = require("./routes/allcardsRoute.js");
const registerRoute = require("./routes/registerRoute.js");
const loginRoute = require("./routes/loginRoute.js");
const logoutRoute = require("./routes/logoutRoute.js");

app.use("/", homeRoute);
app.use("/allcards", allcardsRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);

//exporting app to the server
module.exports = app;

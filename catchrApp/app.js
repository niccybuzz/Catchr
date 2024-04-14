// Main express app
const express = require("express");
const ejs = require("ejs");
const app = express();
const path = require("path");

// Sessions stuff for login route

const session = require("express-session");

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    secret: "mysecretkey1832765",
    saveUninitialized: false,
    cookie: {
      maxAge: oneDay,
      sameSite: true,
    },
    resave: false,
  })
);

//serving static files and config for url encoded forms
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setting view engine and views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// setting routes
const homeRoute = require("./routes/homeRoute.js");
const allcardsRoute = require("./routes/allCardsRoute.js");
const registerRoute = require("./routes/registerRoute.js");
const loginRoute = require("./routes/loginRoute.js");
const logoutRoute = require("./routes/logoutRoute.js");
const createCollecRoute = require("./routes/createCollectionRoute.js");
const myCollecsRoute = require("./routes/myCollectionsRoute.js");
app.use("/cards", allcardsRoute);
app.use("/createcollection", createCollecRoute);
app.use("/mycollections", myCollecsRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/", homeRoute);

//exporting app to the server
module.exports = app;

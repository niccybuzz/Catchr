// Main express app
const express = require("express");
const app = express();
const path = require("path");

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
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setting view engine and views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// setting routes
const mainRouter = require("./routes/mainRouter.js");
app.use("/", mainRouter);

//exporting app to the server
module.exports = app;

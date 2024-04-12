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
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");
const detailsRoute = require("./routes/detailsRoute");
const createCollecRoute = require("./routes/createCollectionRoute");
const allCollecsRoute = require("./routes/allCollecsRoute")

app.use("/allcards", allcardsRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/details", detailsRoute);
app.use("/createcollec", createCollecRoute);
app.use("/allcollections", allCollecsRoute);

const server = app.listen(PORT, () => {
  console.log(`API started on port ${server.address().port}`);
});

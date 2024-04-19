/*
* Starting point for RestAPI
* Accepts and returns JSON data along with revelent status codes
*/
const express = require("express");
const bodyParser = require('body-parser');
const sequelize = require("./config/database");
const associations = require("./models/Associations")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mainRouter = require("./controllers/mainRouter");
app.use("/", mainRouter)

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

/**
 * Express app which handles route handling 
 */
const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const axios = require('axios');

//serving static files
app.use(express.static(path.join(__dirname,"/public/")));

//setting view engine and views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));

//base URL route
app.get("/", (req, res) => {
    res.render("home");
})

//route for all cards
app.get("/allcards", (req, res) => {
    
    let endp = `http://localhost:4000/allcards`
    

    axios.get(endp).then((response) => {
        let cardData = response.data;
        res.render("allcards", {cardData});
    })

   
})

//exporting app to the server
module.exports = app;
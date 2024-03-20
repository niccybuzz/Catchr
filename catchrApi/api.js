require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require('mysql2');
const fs = require('fs');

const PORT = process.env.PORT || 4000;
app.set('view engine', 'ejs');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:10,
    port: process.env.DB_PORT,
    multipleStatements: true
});

connection.getConnection((err)=>{
    if(err) return console.log(err.message);
    console.log("connected to local mysql db using .env properties");
});

app.get('/allcards', (req, res)=> { 

    
    fs.readFile('./SQLqueries/allCards.sql', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading SQL file:', err);
            return;
        }
     
        // Use the SQL query string in your code
        let sqlQuery = data;

        connection.query(sqlQuery, (err, data) => {

            if (err) throw err;
            res.json(data);
            
        });

    });



});


const server = app.listen(PORT, () => {
    console.log(`API started on port ${server.address().port}`);
});
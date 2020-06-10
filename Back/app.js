const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ergo_rating"
})

connection.connect((err) => {
    if (err) {
        console.error("Error connecting: ", err.stack);
        return;
    }

    console.log("Connected");
})
  
app.use("/users", (req, res) => {

    connection.query("SELECT * FROM users", (err, result, fields) => {
        res.send(result);
    })

});

app.use((req, res) => {
    res.send("Bienvenue dans la base de données de Ergo Rating")
})

module.exports = app;
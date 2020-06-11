const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const bcrypt = require("bcrypt");
const salt = 10;

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

// Looking if login already exists in database.
app.use("/user", (req, res, next) => {
    let query = "SELECT * FROM users WHERE login = " + mysql.escape(req.body.login);
    connection.query(query, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            req.body.exists = true;
            req.body.data = result;
        } else {
            req.body.exists = false;
        }
        next()    
    })
})

// Sign-in.
app.post("/user/sign-in", (req, res) => {
    if (req.body.exists) {
        bcrypt.compare(req.body.password, req.body.data[0].password, function (err, result) {
            if (err) throw err;
            if (result) {
                res.send("logged in");
            } else {
                res.send("wrong password");
            }
        });
    } else {
        res.send("This account doesn't exist.");
    }
})

// Register new user.
app.post("/user/add", (req, res) => {

    if (req.body.exists) {
        res.send("This account already exists.");
    } else {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) throw err;
            let query = "INSERT INTO users (login, password, name_company, number_of_employees) VALUES (?, ?, ?, ?)";
            let values = [
                req.body.login,
                hash,
                req.body.companyName,
                req.body.numberOfEmployees
            ];

            connection.query(query, values, (err, result) => {
                if (err) throw err;
                res.send("success");
            })
        });
    }
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
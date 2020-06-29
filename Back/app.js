const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const dbConfig = require("./db.config");
const app = express();
const bcrypt = require("bcrypt");
const salt = 10;
const connection = mysql.createConnection(dbConfig)

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

connection.connect((err) => {
    if (err) {
        console.error("Error connecting: ", err.stack);
        return;
    }

    console.log("Connected");
})

//Get all users with login = :login
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
});


// Sign-in.
app.post("/user/sign-in", (req, res) => {
    if (req.body.exists) {
        bcrypt.compare(req.body.password, req.body.data[0].password, (err, result) => {
            if (err) throw err;
            res.send(req.body.data);
        });
    } else {
        res.send("no account");;
    }
});

// Register new user.
app.post("/user/add", (req, res) => {

    if (req.body.exists) {
        res.send("This account already exists.");
    } else {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
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
});

// Get observations by a given ID.
app.get("/observations/:userId?", (req, res) => {

    let query = "SELECT * FROM observations WHERE user_id = " +
        mysql.escape(req.query.userId) +
        " ORDER BY observation_date DESC";
    
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})
  
// Get observations done by a company.
app.use("/observations", (req, res, next) => {

    let query = "SELECT * FROM observations WHERE user_id = " + req.body.userId;
    connection.query(query, (err, result) => {
        if (err) throw err;
        if (req.body.employeeName) {
            req.body.lastIdInserted = result.length;
            next();
        } else {
            res.send(result);
        }
    });
});

app.post("/observations/employees", (req, res) => {
    
    let query = "SELECT * FROM observations WHERE employee_name REGEXP " + mysql.escape(req.body.employeeName);
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

// Save observation in database.
app.use("/add-observation", (req, res, next) => {

    let query = "INSERT INTO observations (user_id, observation_method, employee_gender, employee_name, employee_id, observer_name, employee_function, observation_title, score_1, score_2, final_score, observation_comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let values = [
        req.body.userId,
        req.body.method,
        req.body.gender,
        req.body.employeeName,
        req.body.employeeId,
        req.body.observerName,
        req.body.functionName,
        req.body.title,
        req.body.score1,
        req.body.score2,
        req.body.finalScore,
        req.body.comment
    ];

    connection.query(query, values, (err, result) => {
        if (err) throw err;
        req.body.insertId = result.insertId;
        next();
    });
});

//Save observation's score details in datababase.
app.post("/add-observation/score-details", (req, res) => {

    let query = "INSERT INTO scoring_rula (observation_id, shoulders_score, neck_score, arms_score, wrist_position, wrist_torsion, trunk_score, legs_score, activity1_score, activity2_score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let values = [
        req.body.insertId, //obssrvation_id
        req.body.shoulderScore, //shoulders_score
        req.body.neckScore, //neck_score
        req.body.elbowScore, //arms_score
        req.body.wristPosition, //wrists_position
        req.body.wristTorsion, //wrist_torsion
        req.body.trunkScore, //trunk_score
        req.body.legsScore, //legs_score
        req.body.activityScore1, //activity1_score
        req.body.activityScore2 //activity2_score
    ];
    
    connection.query(query, values, (err, result) => {
        if (err) throw err;
        res.send("success");
    })
})

//Get observation's score details by a given observation.
app.post("/score-details", (req, res) => {

    let query = "SELECT * FROM scoring_rula WHERE observation_id = " + req.body.observationId;
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

// Get all user accounts.
app.use("/users", (req, res) => {

    connection.query("SELECT * FROM users", (err, result, fields) => {
        res.send(result);
    })

});

app.use((req, res) => {
    res.send("Bienvenue dans la base de données de Ergo Rating")
})

module.exports = app;
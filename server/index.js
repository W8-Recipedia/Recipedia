const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const port = 3001;
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

var con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

app.post("/register", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    console.log(hash);
    con.query(
      "INSERT INTO users (firstname, lastname, email, password) VALUES (?,?,?,?)",
      [firstname, lastname, email, hash],
      (err, result) => {
        if (err) {
          console.log("DB(E): " + err);
        } else {
          console.log("DB(R): " + result);
        }
      }
    );
    console.log("BCRYPT(E): " + err);
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  con.query(
    "SELECT * FROM users (email, password) VALUES (?,?)",
    [email, hash],
    (err, result) => {
      if (err) {
        console.log("DB(E): " + err);
      } else {
        console.log("DB(R): " + result);
      }
    }
  );

  bcrypt.compare(password, hash, function (err, res) {
    if (err) {
      console.log("BCRYPT(E): " + err);
    } else {
      console.log("BCRYPT(R): " + res);
    }
  });
});

app.listen(port, () => {
  console.log("Server is running...");
});

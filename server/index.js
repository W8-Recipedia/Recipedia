const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const gclient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "user",
    secret: "s%3Al3ozSdvQ83TtC5RvJ.CibaQoHtaY0H3QOB1kqR8H2A",
    resave: false,
    saveUninitialized: false,
  })
);

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("No token");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ loggedIn: false });
      } else {
        next();
      }
    });
  }
};

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  con.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          const userid = result[0].userid;
          const token = jwt.sign({ userid }, process.env.JWT_SECRET);
          req.session.user = result;
          res.json({
            token: token,
          });
        } else {
          res.send({ message: "wrongPassword" });
        }
      });
    } else {
      res.send({ message: "noEmail" });
    }
  });
});

app.post("/signup", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    con.query(
      "INSERT INTO users (firstname, lastname, email, password) VALUES (?,?,?,?)",
      [firstname, lastname, email, hash],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          res.send({ result: result });
        }
      }
    );
  });
});

app.get("/userinfo", verifyJWT, (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/guserinfo", (req, res) => {
  gclient
    .verifyIdToken({
      idToken: req.headers["x-access-token"],
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .catch(console.error);
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/glogin", (req, res) => {
  con.query(
    "SELECT * FROM users WHERE email = ?",
    req.body.userprofile.email,
    (err, result) => {
      if (result.length == 0) {
        res.send({ message: "noAccount" });
      } else {
        req.session.user = [req.body.userprofile];
        res.json({});
      }
    }
  );
});

app.post("/gsignup", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    con.query(
      "INSERT INTO users (firstname, lastname, email, password) VALUES (?,?,?,?)",
      [
        req.body.user.givenName,
        req.body.user.familyName,
        req.body.user.email,
        hash,
      ],
      (err, result) => {
        if (err) {
          res.send({ message: "yesAccount" });
        } else {
          req.session.user = [req.body.user];
          res.json({ result: result });
        }
      }
    );
  });
});

app.listen(3001, () => {});

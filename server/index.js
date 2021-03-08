require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
const { OAuth2Client } = require("google-auth-library");
const gclient = new OAuth2Client(
  "265952619085-t28mi10gaiq8i88615gkf095289ulddj.apps.googleusercontent.com"
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  con.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          const user = result[0];
          const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
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

app.post("/glogin", (req, res) => {
  con.query(
    "SELECT * FROM users WHERE email = ?",
    req.body.userprofile.email,
    (err, result) => {
      if (result.length == 0) {
        res.send({ message: "noAccount" });
      } else {
        const user = req.body.userprofile;
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.json({
          token: token,
        });
      }
    }
  );
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
          const user = req.body.user;
          const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          res.json({ token: token, result: result });
        }
      }
    );
  });
});

app.get("/userinfo", (req, res) => {
  if (req.headers["x-access-token"]) {
    const token = jwt.verify(
      req.headers["x-access-token"],
      process.env.JWT_SECRET
    );
    res.send({ loggedIn: true, user: token.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/deleteaccount", (req, res) => {
  const token = jwt.verify(
    req.headers["x-access-token"],
    process.env.JWT_SECRET
  );
  con.query(
    "DELETE FROM users WHERE email = ?",
    token.user.email,
    (err, result) => {
      if (err) {
        res.send({ message: "error" });
      } else {
        res.send({ message: "success" });
      }
    }
  );
});

app.post("/changedetails", (req, res) => {
  console.log(req.headers["x-access-token"]);
  const token = jwt.verify(
    req.headers["x-access-token"],
    process.env.JWT_SECRET
  );
  const uid = token.user.userid;
  con.query(
    "UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE userid = ?",
    [req.body.firstname, req.body.lastname, req.body.email, token.user.userid],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "emailExists" });
      } else {
        const user = {
          userid: uid,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
        };
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        console.log(token);
        res.json({ token: token, result: result });
      }
    }
  );
});

app.post("/changepassword", (req, res) => {
  const oldpassword = req.body.oldpassword;
  const newpassword = req.body.newpassword;
  if (req.headers["x-access-token"]) {
    const token = jwt.verify(
      req.headers["x-access-token"],
      process.env.JWT_SECRET
    );
    con.query(
      "SELECT * FROM users WHERE email = ?",
      token.user.email,
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else if (result.length > 0) {
          bcrypt.compare(oldpassword, result[0].password, (error, response) => {
            if (response) {
              bcrypt.hash(newpassword, saltRounds, (err, hash) => {
                con.query(
                  "UPDATE users SET password = ? WHERE email = ?",
                  [hash, email],
                  (err, result) => {
                    if (err) {
                      res.send({ message: "DBError" });
                    }
                  }
                );
              });
              const user = result[0];
              const token = jwt.sign({ user }, process.env.JWT_SECRET, {
                expiresIn: "7d",
              });
              res.json({ passwordChanged: true, token: token });
            } else {
              res.send({ message: "wrongPassword" });
            }
          });
        }
      }
    );
  } else {
    res.send({ loggedIn: false });
  }
});

app.listen(process.env.PORT, () => {});

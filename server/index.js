require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.LOCALHOST_CLIENT_URL
      ? [process.env.LOCALHOST_CLIENT_URL]
      : [process.env.HEROKU_CLIENT_URL, process.env.NETLIFY_CLIENT_URL],
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  const allowedOrigins = process.env.LOCALHOST_CLIENT_URL
    ? [process.env.LOCALHOST_CLIENT_URL]
    : [process.env.HEROKU_CLIENT_URL, process.env.NETLIFY_CLIENT_URL];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);

  con.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
    if (err) {
      console.log(err);

      res.json({ err: err });
    } else if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        console.log(error);

        if (response) {
          const user = result[0];
          const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          res.json({
            token: token,
          });
        } else {
          if (result[0].googlelogin) {
            res.json({ message: "googleAccount" });
          } else {
            res.json({ message: "wrongPassword" });
          }
        }
      });
    } else {
      res.json({ message: "noEmail" });
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
          res.json({ err: err });
        } else {
          const user = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password,
          };
          const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          res.json({
            token: token,
            result: result,
          });
        }
      }
    );
  });
});

app.post("/glogin", (req, res) => {
  con.query(
    "SELECT * FROM users WHERE email = ?",
    req.body.userprofile.email,
    (err, result) => {
      if (result.length === 0) {
        res.json({ message: "noAccount" });
      } else {
        if (result[0].googlelogin) {
          const user = req.body.userprofile;
          const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          res.json({
            token: token,
          });
        } else {
          res.json({ message: "noGoogle" });
        }
      }
    }
  );
});

app.post("/gsignup", (req, res) => {
  con.query(
    "INSERT INTO users (firstname, lastname, googlelogin, email) VALUES (?,?,?,?)",
    [req.body.user.givenName, req.body.user.familyName, 1, req.body.user.email],
    (err, result) => {
      if (err) {
        res.json({ message: "yesAccount" });
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

app.get("/getuserinfo", (req, res) => {
  if (req.headers["x-access-token"]) {
    const token = jwt.verify(
      req.headers["x-access-token"],
      process.env.JWT_SECRET
    );
    res.json({ loggedIn: true, user: token.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.get("/getuserpreferences", (req, res) => {
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
          res.json({ err: err });
        } else if (result.length > 0) {
          res.json({
            diet: result[0].diet,
            allergens: JSON.parse(result[0].allergens),
            health: JSON.parse(result[0].health),
            loggedIn: true,
          });
        }
      }
    );
  } else {
    res.json({ loggedIn: false });
  }
});

app.get("/getuserfavourites", (req, res) => {
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
          res.json({ err: err });
        } else if (result.length > 0) {
          res.json({
            favourites: JSON.parse(result[0].favourites),
            loggedIn: true,
          });
        }
      }
    );
  } else {
    res.json({ loggedIn: false });
  }
});

app.post("/addtofavourites", (req, res) => {
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
          res.json({ err: err });
        } else {
          if (result[0].favourites) {
            favouriteList = JSON.parse(result[0].favourites);
            if (!favouriteList.includes(req.body.favourite.toString())) {
              favouriteList.push(req.body.favourite.toString());
              con.query(
                "UPDATE users SET favourites = ? WHERE email = ?",
                [JSON.stringify(favouriteList), token.user.email],
                (err, result) => {
                  if (err) {
                    res.json({ message: "DBError" });
                  }
                }
              );
            } else {
              res.json({ message: "favouriteExists" });
            }
          } else {
            initialFavourite = JSON.stringify([req.body.favourite]);
            con.query(
              "UPDATE users SET favourites = ? WHERE email = ?",
              [initialFavourite, token.user.email],
              (err, result) => {
                if (err) {
                  res.json({ message: "DBError" });
                }
              }
            );
          }
        }
      }
    );
  } else {
    res.json({ loggedIn: false });
  }
});

app.post("/removefromfavourites", (req, res) => {
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
          res.json({ err: err });
        } else {
          if (result[0].favourites) {
            favouriteList = JSON.parse(result[0].favourites);
            if (favouriteList.includes(req.body.favourite.toString())) {
              const favouriteIndex = favouriteList.indexOf(
                req.body.favourite.toString()
              );
              favouriteList.splice(favouriteIndex, 1);
              con.query(
                "UPDATE users SET favourites = ? WHERE email = ?",
                [JSON.stringify(favouriteList), token.user.email],
                (err, result) => {
                  if (err) {
                    res.json({ message: "DBError" });
                  }
                }
              );
            } else {
              res.json({ message: "favouriteDoesNotExist" });
            }
          }
        }
      }
    );
  } else {
    res.json({ loggedIn: false });
  }
});

app.post("/changeuserinfo", (req, res) => {
  if (req.headers["x-access-token"]) {
    const token = jwt.verify(
      req.headers["x-access-token"],
      process.env.JWT_SECRET
    );
    const uid = token.user.userid;
    con.query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE email = ?",
      [req.body.firstname, req.body.lastname, req.body.email, token.user.email],
      (err, result) => {
        if (err) {
          res.json({ message: "emailExists" });
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
          res.json({ token: token, result: result });
        }
      }
    );
  } else {
    res.json({ message: "noToken" });
  }
});

app.post("/changepreferences", (req, res) => {
  if (req.headers["x-access-token"]) {
    const token = jwt.verify(
      req.headers["x-access-token"],
      process.env.JWT_SECRET
    );
    const healthData = { height: req.body.height, weight: req.body.weight };
    con.query(
      "UPDATE users SET diet = ?, allergens = ?, health = ? WHERE email = ?",
      [
        req.body.diet,
        JSON.stringify(req.body.allergens),
        JSON.stringify(healthData),
        token.user.email,
      ],
      (err, result) => {
        if (err) {
          res.json({ err: err });
        } else {
          res.json({ result: result });
        }
      }
    );
  } else {
    res.json({ message: "noToken" });
  }
});

app.post("/changepassword", (req, res) => {
  if (req.headers["x-access-token"]) {
    const token = jwt.verify(
      req.headers["x-access-token"],
      process.env.JWT_SECRET
    );
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;
    con.query(
      "SELECT * FROM users WHERE email = ?",
      token.user.email,
      (err, result) => {
        if (err) {
          res.json({ err: err });
        } else if (result.length > 0) {
          bcrypt.compare(oldpassword, result[0].password, (error, response) => {
            if (response) {
              bcrypt.hash(newpassword, saltRounds, (err, hash) => {
                con.query(
                  "UPDATE users SET password = ? WHERE email = ?",
                  [hash, token.user.email],
                  (err, result) => {
                    if (err) {
                      res.json({ message: "DBError" });
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
              res.json({ message: "wrongPassword" });
            }
          });
        }
      }
    );
  } else {
    res.json({ loggedIn: false });
  }
});

app.post("/submitfeedback", (req, res) => {
  if (req.headers["x-access-token"]) {
    const token = jwt.verify(
      req.headers["x-access-token"],
      process.env.JWT_SECRET
    );
    con.query(
      "INSERT INTO feedback (email, message) VALUES (?,?)",
      [token.user.email, req.body.feedback],
      (err, result) => {
        if (err) {
          res.json({ message: err });
        } else {
          res.json({ message: "Success" });
        }
      }
    );
  } else {
    res.json({ loggedIn: false });
  }
});

app.get("/deleteaccount", (req, res) => {
  if (req.headers["x-access-token"]) {
    const token = jwt.verify(
      req.headers["x-access-token"],
      process.env.JWT_SECRET
    );
    con.query(
      "DELETE FROM users WHERE email = ?",
      token.user.email,
      (err, result) => {
        if (err) {
          res.json({ message: "error" });
        } else {
          res.json({ message: "success" });
        }
      }
    );
  } else {
    res.json({ loggedIn: false });
  }
});

app.get("/test", (req, res) => {
  res.send("Hello world!");
});

app.listen(process.env.PORT, () => {});

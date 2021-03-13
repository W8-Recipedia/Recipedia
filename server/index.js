require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const request = require("request");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const saltRounds = 10;
const algorithm = "aes-256-ctr";
const secretKey = process.env.ENCRYPTIONKEY;
const iv = crypto.randomBytes(16);

const app = express();

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.RECIPEDIA_EMAIL,
    pass: process.env.RECIPEDIA_PASSWORD,
  },
});

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex")
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString();
};

app.use(express.json());

app.use(
  cors({
    origin: process.env.LOCALHOST_CLIENT_URL
      ? [process.env.LOCALHOST_CLIENT_URL]
      : [process.env.NETLIFY_CLIENT_URL],
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  const allowedOrigins = process.env.LOCALHOST_CLIENT_URL
    ? [process.env.LOCALHOST_CLIENT_URL]
    : [process.env.NETLIFY_CLIENT_URL];
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

app.post("/recipes/random", (req, res) => {
  const tags = req.body.tags ? `&tags=${req.body.tags}` : ``;
  request(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.RECIPE_API_KEY}${tags}&number=${process.env.RECIPE_NUMBER}`,
    (error, response, body) => {
      res.json({ recipes: JSON.parse(body).recipes });
    }
  );
});

app.post("/recipes/informationbulk", (req, res) => {
  request(
    `https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.RECIPE_API_KEY}&ids=${req.body.favourites}`,
    (error, response, body) => {
      res.json(JSON.parse(body));
    }
  );
});

app.post("/recipes/complexsearch", (req, res) => {
  const diet = req.body.diet ? `&diet=${req.body.diet}` : ``;
  const intolerances = req.body.intolerances
    ? `&intolerances=${req.body.intolerances}`
    : ``;
  const type = req.body.type ? `&type=${req.body.type}` : ``;
  const cuisine = req.body.cuisine ? `&cuisine=${req.body.cuisine}` : ``;
  const query = req.body.query ? `&query=${req.body.query}` : ``;

  request(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.RECIPE_API_KEY}&instructionsRequired=${req.body.instructions}&addRecipeInformation=${req.body.recipeinformation}&fillIngredients=${req.body.fillingredients}&number=${process.env.RECIPE_NUMBER}${diet}${intolerances}${type}${cuisine}&offset=${req.body.offset}${query}`,
    (error, response, body) => {
      res.json(JSON.parse(body));
    }
  );
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  con.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
    if (err) {
      res.json({ message: err });
    } else if (result.length > 0) {
      bcrypt.compare(
        password,
        decrypt(JSON.parse(result[0].password)),
        (error, response) => {
          if (result[0].verifiedemail == 1) {
            if (response) {
              console.log(result[0].userid);
              const user = {
                userid: result[0].userid,
                firstname: decrypt(JSON.parse(result[0].firstname)),
                lastname: decrypt(JSON.parse(result[0].lastname)),
              };
              console.log(user);
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
          } else {
            res.json({ message: "notVerified" });
          }
        }
      );
    } else {
      res.json({ message: "noEmail" });
    }
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
          if (result[0].verifiedemail == 1) {
            const user = req.body.userprofile;
            const token = jwt.sign({ user }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });
            res.json({
              token: token,
            });
          } else {
            res.json({ message: "notVerified" });
          }
        } else {
          res.json({ message: "noGoogle" });
        }
      }
    }
  );
});

app.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    con.query(
      "INSERT INTO users (firstname, lastname, email, password) VALUES (?,?,?,?)",
      [
        JSON.stringify(encrypt(req.body.firstname)),
        JSON.stringify(encrypt(req.body.lastname)),
        req.body.email,
        JSON.stringify(encrypt(hash)),
      ],
      (err, result) => {
        if (err) {
          res.json({ message: err });
        } else {
          const user = {
            email: req.body.email,
          };
          const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          var mailOptions = {
            from: "w8.recipedia@gmail.com",
            to: req.body.email,
            subject: "Verify your Recipedia account",
            text: `Click here to verify your Recipedia account (this link is valid for 1 hour): ${
              process.env.LOCALHOST_CLIENT_URL
                ? [process.env.LOCALHOST_CLIENT_URL]
                : [process.env.NETLIFY_CLIENT_URL]
            }/verify/${token}`,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          res.json({ message: "success" });
        }
      }
    );
  });
});

app.post("/gsignup", (req, res) => {
  con.query(
    "INSERT INTO users (firstname, lastname, googlelogin, email) VALUES (?,?,?,?)",
    [
      JSON.stringify(encrypt(req.body.user.givenName)),
      JSON.stringify(encrypt(req.body.user.familyName)),
      1,
      req.body.user.email,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: err });
      } else {
        const user = {
          email: req.body.user.email,
        };
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        var mailOptions = {
          from: "w8.recipedia@gmail.com",
          to: req.body.user.email,
          subject: "Verify your Recipedia account",
          text: `Click here to verify your Recipedia account (this link is valid for 1 hour): ${
            process.env.LOCALHOST_CLIENT_URL
              ? [process.env.LOCALHOST_CLIENT_URL]
              : [process.env.NETLIFY_CLIENT_URL]
          }/verify/${token}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.json({ message: "success" });
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

app.get("/verifyemail", (req, res) => {
  if (req.headers["x-access-token"]) {
    const token = jwt.verify(
      req.headers["x-access-token"],
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          res.json({ message: "notVerified" });
        } else {
          con.query(
            "UPDATE users SET verifiedemail = ? WHERE email = ?",
            [1, decoded.user.email],
            (err, result) => {
              if (err) {
                res.json({ message: "DBError" });
              }
            }
          );
          res.json({ message: "verified" });
        }
      }
    );
  } else {
    res.json({ message: "notVerified" });
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
          res.json({ message: err });
        } else if (result.length > 0) {
          res.json({
            diet: result[0].diet ? decrypt(JSON.parse(result[0].diet)) : null,
            allergens: result[0].allergens
              ? JSON.parse(decrypt(JSON.parse(result[0].allergens)))
              : null,
            health: result[0].health
              ? JSON.parse(decrypt(JSON.parse(result[0].health)))
              : null,
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
          res.json({ message: err });
        } else if (result.length > 0) {
          res.json({
            favourites: result[0].favourites
              ? JSON.parse(decrypt(JSON.parse(result[0].favourites)))
              : null,
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
          res.json({ message: err });
        } else {
          if (result[0].favourites) {
            favouriteList = JSON.parse(
              decrypt(JSON.parse(result[0].favourites))
            );
            if (!favouriteList.includes(req.body.favourite.toString())) {
              favouriteList.push(req.body.favourite.toString());
              con.query(
                "UPDATE users SET favourites = ? WHERE email = ?",
                [
                  JSON.stringify(encrypt(JSON.stringify(favouriteList))),
                  token.user.email,
                ],
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
            con.query(
              "UPDATE users SET favourites = ? WHERE email = ?",
              [
                JSON.stringify(
                  encrypt(JSON.stringify([req.body.favourite.toString()]))
                ),
                token.user.email,
              ],
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
          res.json({ message: err });
        } else {
          if (result[0].favourites) {
            favouriteList = JSON.parse(
              decrypt(JSON.parse(result[0].favourites))
            );
            if (favouriteList.includes(req.body.favourite.toString())) {
              const favouriteIndex = favouriteList.indexOf(
                req.body.favourite.toString()
              );
              favouriteList.splice(favouriteIndex, 1);
              con.query(
                "UPDATE users SET favourites = ? WHERE email = ?",
                [
                  JSON.stringify(encrypt(JSON.stringify(favouriteList))),
                  token.user.email,
                ],
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
      [
        JSON.stringify(encrypt(req.body.firstname)),
        JSON.stringify(encrypt(req.body.lastname)),
        req.body.email,
        token.user.email,
      ],
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
    const healthData = {
      height: req.body.height,
      weight: req.body.weight,
      activity: req.body.activity,
    };
    con.query(
      "UPDATE users SET diet = ?, allergens = ?, health = ? WHERE email = ?",
      [
        JSON.stringify(encrypt(req.body.diet)),
        JSON.stringify(encrypt(JSON.stringify(req.body.allergens))),
        JSON.stringify(encrypt(JSON.stringify(healthData))),
        token.user.email,
      ],
      (err, result) => {
        if (err) {
          res.json({ message: err });
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
          res.json({ message: err });
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

app.listen(process.env.PORT, () => {});

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
const secretKey = process.env.ENCRYPTION_KEY;
const iv = crypto.randomBytes(16);

const app = express();

const con = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
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
  if (text) {
    textString = JSON.stringify(text);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([
      cipher.update(textString),
      cipher.final(),
    ]);
    return JSON.stringify({
      iv: iv.toString("hex"),
      content: encrypted.toString("hex"),
    });
  } else {
    return null;
  }
};

const decrypt = (hash) => {
  if (hash) {
    hashJSON = JSON.parse(hash);
    const decipher = crypto.createDecipheriv(
      algorithm,
      secretKey,
      Buffer.from(hashJSON.iv, "hex")
    );
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(hashJSON.content, "hex")),
      decipher.final(),
    ]);
    return JSON.parse(decrypted.toString());
  } else {
    return null;
  }
};

const verifyToken = (req, res, next) => {
  jwt.verify(
    req.headers["x-access-token"],
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        res.json({ message: err });
      } else {
        res.user = decoded.user;
        next();
      }
    }
  );
};

const sendVerificationEmail = async (email) => {
  const user = {
    email: email,
  };
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const mailOptions = {
    from: "w8.recipedia@gmail.com",
    to: email,
    subject: "Verify your Recipedia account",
    text: `Click here to verify your Recipedia account (this link is valid for 1 hour): ${
      process.env.LOCALHOST_CLIENT_URL
        ? [process.env.LOCALHOST_CLIENT_URL]
        : [process.env.NETLIFY_CLIENT_URL]
    }/verify/${token}`,
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return "error";
    } else {
      return "success";
    }
  });
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

app.post("/recipes/getRecipesComplex", (req, res) => {
  const apiKey = `apiKey=${process.env.RECIPE_API_KEY}`;
  const recipeNumber = `&number=${process.env.RECIPE_NUMBER}`;
  const instructions = `&instructionsRequired=${req.body.instructions}`;
  const recipeInformation = `&addRecipeInformation=${req.body.recipeinformation}`;
  const ingredients = `&fillIngredients=${req.body.fillingredients}`;

  const diet = req.body.diet ? `&diet=${req.body.diet}` : ``;
  const intolerances = req.body.intolerances
    ? `&intolerances=${req.body.intolerances}`
    : ``;
  const type = req.body.type ? `&type=${req.body.type}` : ``;
  const cuisine = req.body.cuisine ? `&cuisine=${req.body.cuisine}` : ``;
  const offset = `&offset=${req.body.offset}`;
  const query = req.body.query ? `&query=${req.body.query}` : ``;
  const random = req.body.random ? `&sort=random` : ``;

  request(
    `https://api.spoonacular.com/recipes/complexSearch?${apiKey}${instructions}${recipeInformation}${ingredients}${recipeNumber}${diet}${intolerances}${type}${cuisine}${offset}${query}${random}`,
    (error, response, body) => {
      res.json(JSON.parse(body));
    }
  );
});

app.post("/recipes/getRecipesByID", (req, res) => {
  const apiKey = `apiKey=${process.env.RECIPE_API_KEY}`;
  const recipeIDs = `&ids=${req.body.favourites}`;

  request(
    `https://api.spoonacular.com/recipes/informationBulk?${apiKey}${recipeIDs}`,
    (error, response, body) => {
      res.json(JSON.parse(body));
    }
  );
});

app.post("/login", (req, res) => {
  con.query(
    "SELECT * FROM users WHERE email = ?",
    req.body.email,
    (err, result) => {
      if (err) {
        res.json({ message: err });
      } else if (result.length !== 1) {
        res.json({ message: "noAccount" });
      } else if (result[0].googlelogin) {
        res.json({ message: "wrongAccountType" });
      } else if (result[0].verifiedemail !== 1) {
        res.json({ message: "accountNotVerified" });
      } else {
        const userID = result[0].userid;
        const email = result[0].email;
        const firstName = decrypt(result[0].firstname);
        const lastName = decrypt(result[0].lastname);
        bcrypt.compare(
          req.body.password,
          decrypt(result[0].password),
          (err) => {
            if (err) {
              res.json({ message: "wrongPassword" });
            } else {
              res.json({
                token: jwt.sign(
                  {
                    user: {
                      userid: userID,
                      email: email,
                      firstname: firstName,
                      lastname: lastName,
                    },
                  },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: "30m",
                  }
                ),
                message: "loggedIn",
              });
            }
          }
        );
      }
    }
  );
});

app.post("/googlelogin", (req, res) => {
  con.query(
    "SELECT * FROM users WHERE email = ?",
    req.body.userprofile.email,
    (err, result) => {
      if (err) {
        res.json({ message: err });
      } else if (result.length !== 1) {
        res.json({ message: "noAccount" });
      } else if (!result[0].googlelogin) {
        res.json({ message: "wrongAccountType" });
      } else if (result[0].verifiedemail !== 1) {
        res.json({ message: "accountNotVerified" });
      } else {
        res.json({
          message: "loggedIn",
          token: jwt.sign(
            { user: req.body.userprofile },
            process.env.JWT_SECRET,
            {
              expiresIn: "30m",
            }
          ),
        });
      }
    }
  );
});

app.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    con.query(
      "INSERT INTO users (firstname, lastname, email, password) VALUES (?,?,?,?)",
      [
        encrypt(req.body.firstname),
        encrypt(req.body.lastname),
        req.body.email,
        encrypt(hash),
      ],
      (err) => {
        if (err) {
          res.json({ message: err });
        } else {
          const user = {
            email: req.body.email,
          };
          sendVerificationEmail(user).then((response) => {
            if (response === "error") {
              res.json({ message: "emailError" });
            } else {
              res.json({ message: "signUpSuccess" });
            }
          });
        }
      }
    );
  });
});

app.post("/googlesignup", (req, res) => {
  con.query(
    "INSERT INTO users (firstname, lastname, googlelogin, email) VALUES (?,?,?,?)",
    [
      encrypt(req.body.user.givenName),
      encrypt(req.body.user.familyName),
      1,
      req.body.user.email,
    ],
    (err) => {
      if (err) {
        res.json({ message: err });
      } else {
        sendVerificationEmail(req.body.user.email).then((response) => {
          if (response === "error") {
            res.json({ message: "emailError" });
          } else {
            res.json({ message: "signUpSuccess" });
          }
        });
      }
    }
  );
});

app.get("/verifyemail", (req, res) => {
  con.query(
    "UPDATE users SET verifiedemail = ? WHERE email = ?",
    [1, res.user.email],
    (err) => {
      if (err) {
        res.json({ message: err });
      } else {
        res.json({ message: "userVerified" });
      }
    }
  );
});

app.post("/resendverification", (req, res) => {
  con.query(
    "SELECT * FROM users WHERE email = ?",
    req.body.email,
    (err, result) => {
      if (err) {
        res.json({ message: err });
      } else if (result.length !== 1) {
        res.json({ message: "noAccount" });
      } else if (result[0].verifiedemail === 1) {
        res.json({ message: "accountAlreadyVerified" });
      } else {
        const user = {
          email: req.body.email,
        };
        sendVerificationEmail(user).then((response) => {
          if (response === "error") {
            res.json({ message: "emailError" });
          } else {
            res.json({ message: "emailSuccess" });
          }
        });
      }
    }
  );
});

app.get("/getuserdata", verifyToken, (req, res) => {
  con.query(
    "SELECT * FROM users WHERE email = ?",
    res.user.email,
    (err, result) => {
      if (err) {
        res.json({ message: err });
      } else if (result.length !== 1) {
        res.json({ message: "noAccount" });
      } else {
        user = res.user;
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "30m",
        });
        const jsonResponse = {};
        if (result[0].diet) {
          jsonResponse.diet = decrypt(result[0].diet);
        }
        if (result[0].allergens) {
          jsonResponse.allergens = decrypt(result[0].allergens);
        }
        if (result[0].health) {
          jsonResponse.health = decrypt(result[0].health);
        }
        if (result[0].favourites) {
          jsonResponse.favourites = decrypt(result[0].favourites);
        }
        jsonResponse.message = "loggedIn";
        jsonResponse.token = token;
        jsonResponse.user = res.user;
        res.json(jsonResponse);
      }
    }
  );
});

app.post("/addtofavourites", verifyToken, (req, res) => {
  con.query(
    "SELECT * FROM users WHERE email = ?",
    res.user.email,
    (err, result) => {
      if (err) {
        res.json({ message: err });
      } else if (result.length !== 1) {
        res.json({ message: "noAccount" });
      } else if (!result[0].favourites) {
        con.query(
          "UPDATE users SET favourites = ? WHERE email = ?",
          [encrypt([req.body.favourite.toString()]), res.user.email],
          (err) => {
            if (err) {
              res.json({ message: err });
            } else {
              res.json({ message: "favouritesUpdated" });
            }
          }
        );
      } else {
        favouriteList = decrypt(result[0].favourites);
        if (favouriteList.includes(req.body.favourite.toString())) {
          res.json({ message: "favouriteExists" });
        } else {
          favouriteList.push(req.body.favourite.toString());
          con.query(
            "UPDATE users SET favourites = ? WHERE email = ?",
            [encrypt(favouriteList), res.user.email],
            (err) => {
              if (err) {
                res.json({ message: err });
              } else {
                res.json({
                  message: "favouritesUpdated",
                });
              }
            }
          );
        }
      }
    }
  );
});

app.post("/removefromfavourites", verifyToken, (req, res) => {
  con.query(
    "SELECT * FROM users WHERE email = ?",
    res.user.email,
    (err, result) => {
      if (err) {
        res.json({ message: err });
      } else if (result.length !== 1) {
        res.json({ message: "noAccount" });
      } else if (!result[0].favourites) {
        res.json({ message: "noFavourites" });
      } else {
        favouriteList = decrypt(result[0].favourites);
        if (favouriteList.includes(req.body.favourite.toString())) {
          favouriteList.splice(
            favouriteList.indexOf(req.body.favourite.toString()),
            1
          );
          con.query(
            "UPDATE users SET favourites = ? WHERE email = ?",
            [encrypt(favouriteList), res.user.email],
            (err) => {
              if (err) {
                res.json({ message: err });
              } else {
                res.json({ message: "favouriteRemoves" });
              }
            }
          );
        }
      }
    }
  );
});

app.post("/changeuserinfo", verifyToken, (req, res) => {
  con.query(
    "UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE email = ?",
    [
      encrypt(req.body.firstname),
      encrypt(req.body.lastname),
      req.body.email,
      res.user.email,
    ],
    (err) => {
      if (err) {
        res.json({ message: err });
      } else {
        res.json({
          message: "updateSuccess",
          token: (token = jwt.sign({ user: res.user }, process.env.JWT_SECRET, {
            expiresIn: "30m",
          })),
        });
      }
    }
  );
});

app.post("/changeuserpreferences", verifyToken, (req, res) => {
  con.query(
    "UPDATE users SET diet = ?, allergens = ?, health = ? WHERE email = ?",
    [
      encrypt(req.body.diet),
      encrypt(req.body.allergens),
      encrypt({
        height: req.body.height,
        weight: req.body.weight,
        activity: req.body.activity,
      }),
      res.user.email,
    ],
    (err) => {
      if (err) {
        res.json({ message: err });
      } else {
        res.json({
          message: "updateSuccess",
          token: jwt.sign({ user: res.user }, process.env.JWT_SECRET, {
            expiresIn: "30m",
          }),
        });
      }
    }
  );
});

app.post("/changeuserpassword", verifyToken, (req, res) => {
  con.query(
    "SELECT * FROM users WHERE email = ?",
    res.user.email,
    (err, result) => {
      if (err) {
        res.json({ message: err });
      } else if (result.length !== 1) {
        res.json({ message: "noAccount" });
      } else {
        bcrypt.compare(
          req.body.oldpassword,
          decrypt(result[0].password),
          (err) => {
            if (err) {
              res.json({ message: err });
            } else {
              bcrypt.hash(req.body.newpassword, saltRounds, (err, hash) => {
                if (err) {
                  res.json({
                    message: err,
                  });
                } else {
                  con.query(
                    "UPDATE users SET password = ? WHERE email = ?",
                    [hash, res.user.email],
                    (err) => {
                      if (err) {
                        res.json({
                          message: err,
                        });
                      } else {
                        res.json({
                          message: "passwordChanged",
                          token: jwt.sign(
                            {
                              user: {
                                userid: result[0].userid,
                                email: result[0].email,
                                firstname: decrypt(result[0].firstname),
                                lastname: decrypt(result[0].lastname),
                              },
                            },
                            process.env.JWT_SECRET,
                            {
                              expiresIn: "30m",
                            }
                          ),
                        });
                      }
                    }
                  );
                }
              });
            }
          }
        );
      }
    }
  );
});

app.post("/submitfeedback", verifyToken, (req, res) => {
  const token = jwt.sign({ user: res.user }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
  const mailOptions = {
    from: "w8.recipedia@gmail.com",
    to: "w8.recipedia@gmail.com",
    subject: `Feedback from ${user.email}`,
    text: req.body.feedback,
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      res.json({ message: err, token: token });
    } else {
      res.json({ message: "feedbackSent", token: token });
    }
  });
});

app.get("/deleteaccount", verifyToken, (req, res) => {
  con.query("DELETE FROM users WHERE email = ?", res.user.email, (err) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.json({ message: "accountDeleted" });
    }
  });
});

app.listen(process.env.PORT);

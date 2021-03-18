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

const databaseSelect = (req, res, next) => {
  con.query(
    "SELECT * FROM users WHERE email = ?",
    req.body.email ? req.body.email : res.user.email,
    (err, result) => {
      if (err) {
        res.json({ message: err });
      } else if (result.length !== 1) {
        res.json({ message: "noAccount" });
      } else {
        res.result = result[0];
        next();
      }
    }
  );
};

const sendVerificationEmail = (email) => {
  const mailOptions = {
    from: "w8.recipedia@gmail.com",
    to: email,
    subject: "Verify your Recipedia account",
    text: `Click here to verify your Recipedia account (this link is valid for 1 hour): ${
      process.env.LOCALHOST_CLIENT_URL
        ? process.env.LOCALHOST_CLIENT_URL
        : process.env.NETLIFY_CLIENT_URL
    }/verify/${jwt.sign(
      {
        user: {
          email: email,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    )}`,
  };

  transporter.sendMail(mailOptions);
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
  const instructions = `&instructionsRequired=true`;
  const recipeInformation = `&addRecipeInformation=true`;
  const recipeNutrition = `&addRecipeInformation=true`;
  const ingredients = `&fillIngredients=true`;
  const random = `&sort=random`;
  const intolerances = req.body.intolerances
    ? `&intolerances=${req.body.intolerances}`
    : ``;
  const diet = req.body.diet ? `&diet=${req.body.diet}` : ``;
  const type = req.body.dishtypes ? `&type=${req.body.dishtypes}` : ``;
  const cuisine = req.body.cuisines ? `&cuisine=${req.body.cuisines}` : ``;
  const query = req.body.query ? `&query=${req.body.query}` : ``;
  const minCalories = req.body.minCalories
    ? `&minCalories=${req.body.minCalories}`
    : `&minCalories=0`;
  const maxCalories = req.body.maxCalories
    ? `&maxCalories=${req.body.maxCalories}`
    : ``;
  const offset = req.body.offset ? `&offset=${req.body.offset}` : ``;
  request(
    `https://api.spoonacular.com/recipes/complexSearch?${apiKey}${recipeNumber}${instructions}${recipeInformation}${recipeNutrition}${ingredients}${random}${intolerances}${diet}${type}${cuisine}${query}${minCalories}${maxCalories}${offset}`,
    (error, response, body) => {
      res.json(JSON.parse(body));
    }
  );
});

app.post("/recipes/getRecipesByID", (req, res) => {
  const apiKey = `apiKey=${process.env.RECIPE_API_KEY}`;
  const recipeIDs = `&ids=${req.body.favourites}`;
  const recipeNutrition = `&includeNutrition=true`;

  request(
    `https://api.spoonacular.com/recipes/informationBulk?${apiKey}${recipeIDs}${recipeNutrition}`,
    (error, response, body) => {
      res.json(JSON.parse(body));
    }
  );
});

app.post("/login", databaseSelect, (req, res) => {
  if (res.result.googlelogin) {
    res.json({ message: "wrongAccountTypeGoogle" });
  } else if (res.result.verifiedemail !== 1) {
    res.json({ message: "accountNotVerified" });
  } else {
    const userID = res.result.userid;
    const email = res.result.email;
    const firstName = decrypt(res.result.firstname);
    const lastName = decrypt(res.result.lastname);
    bcrypt.compare(req.body.password, decrypt(res.result.password), (err) => {
      if (err) {
        res.json({ message: err });
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
    });
  }
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
        res.json({ message: "wrongAccountTypeNotGoogle" });
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
          sendVerificationEmail(req.body.email);
          res.json({ message: "signUpSuccess" });
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
        sendVerificationEmail(req.body.user.email);
        res.json({ message: "signUpSuccess" });
      }
    }
  );
});

app.get("/verifyemail", verifyToken, (req, res) => {
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

app.post("/resendverification", databaseSelect, (req, res) => {
  if (res.result.verifiedemail === 1) {
    res.json({ message: "accountAlreadyVerified" });
  } else {
    sendVerificationEmail(req.body.email);
    res.json({ message: "emailSuccess" });
  }
});

app.get("/getuserdata", verifyToken, databaseSelect, (req, res) => {
  const jsonResponse = { user: {} };
  if (res.result.diet) {
    jsonResponse.diet = decrypt(res.result.diet);
  }
  if (res.result.allergens) {
    jsonResponse.allergens = decrypt(res.result.allergens);
  }
  if (res.result.health) {
    jsonResponse.health = decrypt(res.result.health);
  }
  if (res.result.favourites) {
    jsonResponse.favourites = decrypt(res.result.favourites);
  }

  res.user.firstname = decrypt(res.result.firstname);
  res.user.lastname = decrypt(res.result.lastname);
  res.user.email = res.result.email;
  res.user.userid = res.result.userid;
  jsonResponse.message = "loggedIn";
  jsonResponse.google = res.result.googlelogin;
  jsonResponse.token = jwt.sign({ user: res.user }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
  jsonResponse.user = res.user;
  res.json(jsonResponse);
});

app.post("/addtofavourites", verifyToken, databaseSelect, (req, res) => {
  if (!res.result.favourites) {
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
    favouriteList = decrypt(res.result.favourites);
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
});

app.post("/removefromfavourites", verifyToken, databaseSelect, (req, res) => {
  if (!res.result.favourites) {
    res.json({ message: "noFavourites" });
  } else {
    favouriteList = decrypt(res.result.favourites);
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
        });
      }
    }
  );
});

app.post("/changeuserpassword", verifyToken, databaseSelect, (req, res) => {
  bcrypt.compare(req.body.oldpassword, decrypt(res.result.password), (err) => {
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
                });
              }
            }
          );
        }
      });
    }
  });
});

app.post("/submitfeedback", verifyToken, (req, res) => {
  const mailOptions = {
    from: "w8.recipedia@gmail.com",
    to: "w8.recipedia@gmail.com",
    subject: `Feedback from ${res.user.email}`,
    text: req.body.feedback,
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.json({ message: "feedbackSent" });
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

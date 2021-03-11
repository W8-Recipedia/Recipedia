# Recipedia

Recipedia is a web application that seeks to revolutionize the way that people find personalised recipes. It recommends the most suitable recipes to users based on their dietary preferences, allergies, and health data. It also has a search function, which allows users to filter recipes by cuisine and/or diet.

## Getting Started

These instructions will get Recipedia up and running on your local machine.

### Prerequisites

You need `node` and `npm` installed globally on your machine. You will also need to make a [Spoonacular](https://spoonacular.com/food-api/console#Dashboard) account to access the [Spoonacular API](https://spoonacular.com/food-api), and a MySQL database to store user details.

### Installing

Cloning the repository:
`git clone https://github.com/W8-Recipedia/Recipedia.git`

---

Environment variables:

Add a `.env` file to your client and server directories, and replace `[...]` with the relevant values.

client/.env

```
REACT_APP_SERVER_URL=http://localhost:3001
```

server/.env

```
JWT_SECRET=[RANDOM ALPHABETICAL STRING]
LOCALHOST_CLIENT_URL=http://localhost:3000
HOST=[DATABASE URL]
USER=[DATABASE USER]
PASSWORD=[DATABASE PASSWORD]
DATABASE=[DATABASE NAME]
PORT=3001
RECIPE_API_KEY=[SPOONACULAR API KEY]
RECIPE_NUMBER=24
```

---

Database setup (replace `+XX:XX` with your time zone):

```
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+XX:XX";

CREATE TABLE `feedback` (
  `email` varchar(254) COLLATE utf8_unicode_ci NOT NULL,
  `message` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `firstname` text COLLATE utf8_unicode_ci NOT NULL,
  `lastname` text COLLATE utf8_unicode_ci NOT NULL,
  `googlelogin` tinyint(1) NOT NULL DEFAULT '0',
  `email` varchar(254) COLLATE utf8_unicode_ci NOT NULL,
  `password` text COLLATE utf8_unicode_ci,
  `diet` text COLLATE utf8_unicode_ci,
  `allergens` json DEFAULT NULL,
  `health` json DEFAULT NULL,
  `favourites` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT;
```
If you get errors for the `json` columns, you can change them to `text` columns.

---

Installation:

`npm run install-all`

Starting Recipedia:

`npm run dev`

## Built With

- [React](https://reactjs.org/)
- [Material-UI](https://material-ui.com/)
- [Spoonacular API](https://spoonacular.com/food-api)
- [Formik + Yup](https://formik.org/)
- [Axios](https://www.npmjs.com/package/axios)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [NPM](https://www.npmjs.com/)
- [Google Sign-in](https://developers.google.com/identity/sign-in/web)

## Authors

- **[Aryan Agrawal](https://github.com/ary4n99)**
- **[Shadi Abumattar](https://github.com/AbumattarSA)**
- [Ahmed Soliman](https://github.com/LEGENDSOLI)
- [AJ Singh](https://github.com/asjsingh)
- [Stefan Tutugan](https://github.com/tutugan)
- [Max Lawley](https://github.com/lawleymax)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more details.

## Acknowledgments

- [Devias Material-UI Kit](https://github.com/devias-io/material-kit-react/) - Initial website design
- [Prettier](https://prettier.io/) - Code formatting

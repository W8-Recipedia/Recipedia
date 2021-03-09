# Recipedia

Recipedia is a web application that seeks to revolutionize the way that people find personalised recipes. It recommends the most suitable recipes to users based on their dietary preferences, allergies, and health data. It also has a search function, which allows users to filter recipes by cuisine and/or diet.

## Getting Started

These instructions will get you a copy of Recipedia up and running on your local machine. 

### Prerequisites
You need `node` and `npm` installed globally on your machine. You will also need to make a [Spoonacular](https://spoonacular.com/food-api/console#Dashboard) account to access the [Spoonacular API](https://spoonacular.com/food-api), and a MySQL database.

### Installing

Clone this repository:
`git clone https://github.com/W8-Recipedia/Recipedia.git`

---
Add a `.env` file to your client and server directories, and replace `[...]` with the relevant values:

client/.env
```
REACT_APP_SERVER_URL=http://localhost:3001
REACT_APP_RECIPE_API_KEY=[SPOONACULAR API KEY]
REACT_APP_MAX_RECIPE_NUMBER=21
```

server/.env
```
SESSION_SECRET=[RANDOM ALPHANUMERIC STRING]
JWT_SECRET=[RANDOM ALPHABETIC STRING]
CLIENT_URL=http://localhost:3000
HOST=[DATABASE URL]
USER=[DATABASE USER]
PASSWORD=[DATABASE PASSWORD]
DATABASE=[DATABASE NAME]
PORT=3001
```

---
Installation:

`npm run install-all`

Starting the app:

`npm run dev`  

## Built With

* [React](https://reactjs.org/)
* [Material-UI](https://material-ui.com/)
* [Spoonacular API](https://spoonacular.com/food-api)
* [Formik + Yup](https://formik.org/)
* [Axios](https://www.npmjs.com/package/axios)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [JWT](https://jwt.io/)
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MySQL](https://www.mysql.com/)
* [NPM](https://www.npmjs.com/)
* [Google Sign-in](https://developers.google.com/identity/sign-in/web)

## Authors

* **[Aryan Agrawal](https://github.com/ary4n99)**
* **[Shadi Abumattar](https://github.com/AbumattarSA)**
* [Ahmed Soliman](https://github.com/LEGENDSOLI)
* [AJ Singh](https://github.com/asjsingh)
* [Stefan Tutugan](https://github.com/tutugan)
* [Max Lawley](https://github.com/lawleymax)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more details.

## Acknowledgments

* [Devias Material-UI Kit](https://github.com/devias-io/material-kit-react/) - Initial website design
* [Prettier](https://prettier.io/) - Code formatting

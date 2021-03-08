# Recipedia

Recipedia is a web application that seeks to revolutionize the way that people find personalised recipes. It recommends the most suitable recipes to users based on their dietary preferences, allergies, and much more. It also has a search function, which allows users to filter recipes by cuisine, diet, or calories.

Recipedia is built with the SERN stack; it uses the Spoonacular API to fetch recipes according to user provided data, and beautifully displays them in the browser using Material UI for React. All of the user data is encrypted and stored securely in a remote SQL database, and recipes are recommended using our proprietary algorithms written in Express.

We are a team of 7 people, using an agile development process to create this project.

## To Do
- [ ] **User data logic (diets, allergens & height/weight)**
  - [ ] Get user data from database and display on settings page (keep save button greyed out)
  - [ ] Make button available to user when changes are made to the settings
  - [ ] Push changes to database when save button is clicked
  - [ ] Store user data in localstorage
  - [ ] Use user data from localstorage in requests for home & search page
- [ ] **Favourites logic**
  - [ ] Make favourite button functional (only allow to favourite on home/search and to unfavourite on favourites  page)
  - [ ] Favouriting: get recipe ID from front-end, post to server, get current favourites from database, if ID not present then append and send to database, otherwise do nothing
  - [ ] Unfavouriting: get recipe ID from front-end, post to server, get current favourites from database, remove ID from array, send back to database
  - [ ] Show favourites on favourites page in chronological order
- [ ] **Other improvements**
  - [ ] Show already favourited recipes on search and home pages
  - [ ] Upgrade user auth
  - [ ] Move navbar to topbar
  - [ ] Prevent Google users from logging in normally vice versa (don't require users to enter a password when signing up with Google)
  - [ ] Remove redundant code/comments and refactor 
  - [ ] Implement backend for changing name & email
  - [ ] Implement dark mode
  - [ ] Ensure website follows GDPR regulations
  - [ ] Change website colour scheme
  - [ ] Add recipe card loading animations
  - [ ] Revamp landing page
  - [ ] Implement backend for feedback page (auto insert user data into fields and send feedback to Recipedia email)

import React, { useEffect, useState } from "react";
import { 
  Box,
  Grid, 
  Container, 
  makeStyles,
  Select,
  InputLabel,
  Input,
  Checkbox,
  MenuItem,
  ListItemText, } from "@material-ui/core";
import Page from "src/components/Page";
// import { getExampleRecipes } from "src/api/mockAPI";
import { getRecipesComplex } from "src/api/SpoonacularAPI";
import RecipeInfoDialog from "src/views/search/SearchView/components/RecipeInfoDialog";
import RecipeCardList from "src/views/search/SearchView/components/RecipeCardList";
import Searchbar from "src/views/search/SearchView/components/Searchbar";
import { Scrollbars } from "react-custom-scrollbars";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const cuisineNames = [
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

const typeNames = [
  "main course",
  "side dish",
  "dessert",
  "appetizer",
  "salad",
  "bread",
  "breakfast",
  "soup",
  "beverage",
  "sauce",
  "marinade",
  "fingerfood",
  "snack",
  "drink",
];

const SearchView = () => {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(0);
  const [selectedRecipeInfo, setSelectedRecipeInfo] = useState({});
  const [dlgOpen, setDlgOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [ingredients] = useState([]);
  const [intolerances] = useState([]);
  const [diets] = useState([]);
  const [cuisineName, setCuisineName] = React.useState([]);
  const [typeName, setTypeName] = React.useState([]);

  const handleChangeCuisine = (event) => {
    setCuisineName(event.target.value);
  };

  const handleChangeType = (event) => {
    setTypeName(event.target.value);
  };

  const handleQuerySearch = (query) => {
    setSearchQuery(query);
    loadRecipes(ingredients, intolerances, diets, typeName, cuisineName, 0, query);
  };

  const onRecipeClick = (id) => {
    loadRecipeById(id);
    setSelectedRecipeId(id);
  };

  // // USED FOR TESTING
  // useEffect(() => {
  //   setRecipes(getExampleRecipes());
  // }, []);

  return (
    <Scrollbars>
      <Page className={classes.root} title="Recipedia | Search">
        <Container maxWidth={false}>
        <Box mt={1}>
          <Grid container spacing={3}>
            <Searchbar onSubmit={handleQuerySearch} />
            <Grid item md={3} xs={12}>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                multiple
                fullWidth
                value={typeName}
                onChange={handleChangeType}
                input={<Input />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {typeNames.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={typeName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item md={3} xs={12}>
              <InputLabel id="cuisine-label">Cuisine</InputLabel>
              <Select
                labelId="cuisine-label"
                id="cuisine"
                multiple
                fullWidth
                value={cuisineName}
                onChange={handleChangeCuisine}
                input={<Input />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {cuisineNames.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={cuisineName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Box>        
          <Box mt={3}>
            <RecipeCardList recipes={recipes} onRecipeClick={onRecipeClick} />
          </Box>
        </Container>
          <RecipeInfoDialog
            open={dlgOpen}
            handleClose={() => setDlgOpen(false)}
            recipeId={selectedRecipeId}
            recipeInfo={selectedRecipeInfo}
          />
      </Page>
    </Scrollbars>
  );

  function loadRecipes(
    ingredientsArray,
    intolerancesArray,
    dietsArray,
    typesArray,
    cuisineArray,
    offset,
    query
  ) {
    let ingredientsString = ingredientsArray.map((o) => o.name).join(",");
    let intolerancesString = intolerancesArray.join(",");
    let dietsString = dietsArray.join(",");
    let dishTypesString = typesArray.join(",");
    let cuisinesString = cuisineArray.join(",");
    getRecipesComplex(
      ingredientsString,
      intolerancesString,
      dietsString,
      dishTypesString,
      cuisinesString,
      offset,
      query
    )
      .then((res) => {
        console.log("recipes:", res.data);
        offset
          ? setRecipes([...recipes, ...res.data.results])
          : setRecipes(res.data.results);
      })
      .catch((error) => console.log(error))
  }

  function loadRecipeById(id) {
    const clickedRecipe = recipes.find((recipe) => recipe.id === id);
    console.log(clickedRecipe);
    setSelectedRecipeInfo(clickedRecipe);
    setDlgOpen(true);
  }

};

export default SearchView;

import React, { useEffect, useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
// import { getExampleRecipes } from "src/api/mockAPI";
import { getRecipesComplex } from "src/api/SpoonacularAPI";
import RecipeInfoDialog from "src/views/search/SearchView/components/RecipeInfoDialog";
import RecipeCardList from "src/views/search/SearchView/components/RecipeCardList";
import Searchbar from "src/views/search/SearchView/components/Searchbar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const SearchView = () => {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(0);
  const [selectedRecipeInfo, setSelectedRecipeInfo] = useState({});
  const [dlgOpen, setDlgOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [offset] = useState(0);
  const [ingredients] = useState([]);
  const [diets] = useState([]);
  const [intolerances] = useState([]);
  
  const handleQuerySearch = (query) => {
    setSearchQuery(query);
    loadRecipes([], ingredients, intolerances, 0, query);
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
    <Page className={classes.root} title="Recipedia | Search">
      <Container maxWidth={false}>
        <Searchbar onSubmit={handleQuerySearch} />
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
  );

  function loadRecipes(
    ingredientsArray,
    intolerancesArray,
    dietsArray,
    offset,
    query
  ) {
    let ingredientsString = ingredientsArray.map((o) => o.name).join(",");
    let intolerancesString = intolerancesArray.join(",");
    let dietsString = dietsArray.join(",");
    getRecipesComplex(
      ingredientsString,
      intolerancesString,
      dietsString,
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

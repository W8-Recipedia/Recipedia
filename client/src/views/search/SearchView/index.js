import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "src/components/Page";
// import { getExampleRecipes } from "src/api/mockAPI";
import { getRecipesComplex } from "src/api/SpoonacularAPI";
import RecipeInfoDialog from "src/views/search/SearchView/components/RecipeInfoDialog";
import RecipeCardList from "src/views/search/SearchView/components/RecipeCardList";
import Searchbar from "src/views/search/SearchView/components/Searchbar";
import { Scrollbars } from "react-custom-scrollbars";

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
    <Scrollbars>
      <Page className={classes.root} title="Recipedia | Search">
        <Container maxWidth="lg">
          <Card variant="outlined">
            <CardContent>
              <Box p={1}>
                <Typography gutterBottom variant="h1">
                  Search here.
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  If you want to find recipes filtered by cuisine or type you
                  can do that here.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
        <Container maxWidth={false}>
          <Box mt={3}>
            <Searchbar onSubmit={handleQuerySearch} />
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
      .catch((error) => console.log(error));
  }

  function loadRecipeById(id) {
    const clickedRecipe = recipes.find((recipe) => recipe.id === id);
    console.log(clickedRecipe);
    setSelectedRecipeInfo(clickedRecipe);
    setDlgOpen(true);
  }
};

export default SearchView;

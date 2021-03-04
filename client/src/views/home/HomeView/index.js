import React, { useState, useEffect } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
// import { getExampleRecipes } from "src/api/mockAPI";
import { getRandomRecipes } from "src/api/SpoonacularAPI";
import RecipeInfoDialog from "src/views/home/HomeView/components/RecipeInfoDialog";
import RecipeCardList from "src/views/home/HomeView/components/RecipeCardList";
import { Scrollbars } from "react-custom-scrollbars";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Home = () => {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(0);
  const [selectedRecipeInfo, setSelectedRecipeInfo] = useState({});
  const [dlgOpen, setDlgOpen] = useState(false);

  const onRecipeClick = (id) => {
    loadRecipeById(id);
    setSelectedRecipeId(id);
  };

  // USED FOR TESTING
  // useEffect(() => {
  //   setRecipes(getExampleRecipes());
  // }, []);

  useEffect(() => {
    loadRandomRecipes();
  }, []);

  const loadMoreRecipes = () => {
    loadRandomRecipes();
  };

  return (
    <Scrollbars>
    <Page className={classes.root} title="Recipedia | Home">
      <Container maxWidth={false}>
        <Box mt={3}>
            <RecipeCardList 
              recipes={recipes}
              onRecipeClick={onRecipeClick}
              loadMore={loadMoreRecipes} />
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
  )

    function loadRandomRecipes() {
      getRandomRecipes()
        .then((res) => {
          console.log("recipes:", res.data);
          setRecipes([...recipes, ...res.data.recipes])
          // setRecipes(getExampleRecipes());
          return false;
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

export default Home;

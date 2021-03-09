import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  makeStyles,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import Page from "src/components/theme/page";
// import { getExampleRecipes } from "src/api/mockAPI";
import { getRandomRecipes } from "src/components/api/SpoonacularAPI";
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
  const [loading, setLoading] = useState(false);
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
        <Container maxWidth="xl">
          <Card variant="outlined">
            <CardContent>
              <Box p={1}>
                <Typography gutterBottom variant="h1">
                  Welcome home.
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  View our delightful assortment of recipes, curated just for
                  you.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
        <Container maxWidth={false}>
          <Box mt={3}>
            <RecipeCardList
              recipes={recipes}
              onRecipeClick={onRecipeClick}
              loadMore={loadMoreRecipes}
              loading={loading}
            />
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

  function loadRandomRecipes() {
    setLoading(true);
    getRandomRecipes()
      .then((res) => {
        console.log("recipes:", res.data);
        setRecipes([...recipes, ...res.data.recipes]);
        // setRecipes(getExampleRecipes());
        return false;
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }

  function loadRecipeById(id) {
    const clickedRecipe = recipes.find((recipe) => recipe.id === id);
    console.log(clickedRecipe);
    setSelectedRecipeInfo(clickedRecipe);
    setDlgOpen(true);
  }
};

export default Home;

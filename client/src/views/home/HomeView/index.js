import React, { useState, useLayoutEffect } from "react";
import { getUserPreferences } from "src/components/auth/UserAuth";
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
import { getRecommendedRecipes } from "src/components/api/SpoonacularAPI";
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
  const [offset, setOffset] = useState(0);
  const [intolerances, setIntolerances] = useState([]);
  const [diet, setDiet] = useState("");

  const onRecipeClick = (id) => {
    loadRecipeById(id);
    setSelectedRecipeId(id);
  };

  // useEffect(() => {
  //   setRecipes(getExampleRecipes());
  // }, []);

  useLayoutEffect(() => {
    getUserPreferences().then((res) => {
      setIntolerances(res.data.allergens);
      setDiet(res.data.diet);
      loadRecommendedRecipes(res.data.allergens, res.data.diet, 0);
    });
  }, []);

  const loadMoreRecipes = () => {
    let newOffset = offset + parseInt(process.env.REACT_APP_MAX_RECIPE_NUMBER);
    setOffset(newOffset);
    loadRecommendedRecipes(intolerances, diet, newOffset);
  };

  return (
    <Scrollbars>
      <Page className={classes.root} title="Recipedia | Home">
        <Box m={2}>
          <Container maxWidth="false">
            <Card variant="outlined">
              <CardContent>
                <Box p={1}>
                  <Typography gutterBottom variant="h1">
                    Welcome home.
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
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
        </Box>
      </Page>
    </Scrollbars>
  );

  function loadRecommendedRecipes(intolerancesArray, diet, offset) {
    setLoading(true);
    let intolerancesString = intolerancesArray
      ? intolerancesArray.join(",")
      : null;
    getRecommendedRecipes(intolerancesString, diet, offset)
      .then((res) => {
        offset
          ? setRecipes([...recipes, ...res.data.results])
          : setRecipes(res.data.results);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function loadRecipeById(id) {
    const clickedRecipe = recipes.find((recipe) => recipe.id === id);
    setSelectedRecipeInfo(clickedRecipe);
    setDlgOpen(true);
  }
};

export default Home;

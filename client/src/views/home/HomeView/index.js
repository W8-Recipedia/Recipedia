import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Page from "src/components/theme/page";
import { getShuffledRecommendedRecipes } from "src/components/api/SpoonacularAPI";
import PropTypes from "prop-types";
import RecipeDialog from "src/components/recipe/RecipeDialog";
import RecipeList from "src/components/recipe/RecipeList";
import { Scrollbars } from "react-custom-scrollbars";
import { getRandomRecommendedRecipes } from "src/components/api/SpoonacularAPI";
import { getUserData } from "src/components/auth/UserAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  loadMoreGridBtn: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "15px",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(0);
  const [selectedRecipeInfo, setSelectedRecipeInfo] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [offset] = useState(0);
  const [intolerances, setIntolerances] = useState([]);
  const [diet, setDiet] = useState("");

  const onRecipeClick = (id) => {
    loadRecipeById(id);
    setSelectedRecipeId(id);
  };

  useLayoutEffect(() => {
    getUserPreferences().then((res) => {
      setIntolerances(res.data.allergens);
      setDiet(res.data.diet);
      loadShuffledRecommendedRecipes(
        res.data.allergens,
        res.data.diet,
        0,
      );
    getUserData().then((response) => {
      setIntolerances(response.data.allergens);
      setDiet(response.data.diet);
      loadShuffledRecommendedRecipes(
        res.data.allergens,
        res.data.diet,
        0,
      );
    });
  }, []);

  const loadMoreRecipes = () => {
    let newOffset = offset + parseInt(process.env.REACT_APP_SEARCH_OFFSET)
    loadShuffledRecommendedRecipes(
      intolerances,
      diet,
      newOffset);
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
              <RecipeList
                recipes={recipes}
                onRecipeClick={onRecipeClick}
                loading={loading}
              />
            </Box>
            <Grid item xs={12} className={classes.loadMoreGridBtn}>
              <Box mt={3}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <Button color="primary" onClick={loadMoreRecipes}>
                      <ExpandMoreIcon /> Load more recipes! <ExpandMoreIcon />
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
          </Container>
          <RecipeDialog
            open={dialogOpen}
            handleClose={() => setDialogOpen(false)}
            recipeId={selectedRecipeId}
            recipeInfo={selectedRecipeInfo}
          />
        </Box>
      </Page>
    </Scrollbars>
  );

  function loadShuffledRecommendedRecipes(intolerancesArray, diet, offset) {
    setLoading(true);
    let intolerancesString = intolerancesArray ? intolerancesArray.join(",") : null
    getShuffledRecommendedRecipes(intolerancesString, diet, offset)
      .then((res) => {
        if (res.data.results) {
          offset
          ? setRecipes([...recipes, ...res.data.results])
          : setRecipes(res.data.results);
          console.log("recipes:", res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function loadRecipeById(id) {
    const clickedRecipe = recipes.find((recipe) => recipe.id === id);
    setSelectedRecipeInfo(clickedRecipe);
    setDialogOpen(true);
  }
};

RecipeList.propTypes = {
  loading: PropTypes.bool,
};

export default Home;

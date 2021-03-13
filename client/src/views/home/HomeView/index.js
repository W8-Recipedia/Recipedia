import React, { useState, useLayoutEffect } from "react";
import { getUserPreferences } from "src/components/auth/UserAuth";
import {
  Box,
  Container,
  makeStyles,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Page from "src/components/theme/page";
// import { getExampleRecipes } from "src/api/mockAPI";
import { getShuffledRecommendedRecipes } from "src/components/api/SpoonacularAPI";
import RecipeDialog from "src/components/recipe/RecipeDialog";
import RecipeList from "src/components/recipe/RecipeList";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Scrollbars } from "react-custom-scrollbars";

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

  // useEffect(() => {
  //   setRecipes(getExampleRecipes());
  // }, []);

  useLayoutEffect(() => {
    getUserPreferences().then((res) => {
      setIntolerances(res.data.allergens);
      setDiet(res.data.diet);
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

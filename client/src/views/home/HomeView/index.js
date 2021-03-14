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
import PropTypes from "prop-types";
import RecipeDialog from "src/components/recipe/RecipeDialog";
import RecipeList from "src/components/recipe/RecipeList";
import { Scrollbars } from "react-custom-scrollbars";
// import { getExampleRecipes } from "src/api/mockAPI";
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
  const [offset, setOffset] = useState(0);
  const [intolerances, setIntolerances] = useState([]);
  const [diet, setDiet] = useState("");
  const [tags, setTags] = useState("");

  const onRecipeClick = (id) => {
    loadRecipeById(id);
    setSelectedRecipeId(id);
  };

  // useEffect(() => {
  //   setRecipes(getExampleRecipes());
  // }, []);

  useLayoutEffect(() => {
    getUserData().then((response) => {
      setIntolerances(response.data.allergens);
      setDiet(response.data.diet);
      const userDietLowerCase = response.data.diet
        ? response.data.diet.toLowerCase()
        : null;
      const userIntolerancesArray = response.data.allergens
        ? response.data.allergens.join(",").toLowerCase()
        : null;
      const tags = userIntolerancesArray
        ? [userDietLowerCase, userIntolerancesArray]
        : [userDietLowerCase];
      setTags(tags);
      loadRandomRecommendedRecipes();
    });
  }, []);

  const loadMoreRecipes = () => {
    loadRandomRecommendedRecipes();
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

  function loadRandomRecommendedRecipes() {
    setLoading(true);
    let tagsString = tags ? tags.join(",") : null;
    if (tagsString === "none") {
      tagsString = "";
    }
    getRandomRecommendedRecipes(tagsString)
      .then((res) => {
        if (res.data) {
          setRecipes([...recipes, ...res.data]);
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

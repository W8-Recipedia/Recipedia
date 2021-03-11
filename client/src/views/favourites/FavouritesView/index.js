import React, { useState, useLayoutEffect, useEffect } from "react";
import { getUserFavourites } from "src/components/auth/UserAuth";
import {
  Box,
  Container,
  makeStyles,
  Card,
  Typography,
  CardContent,
  Grid,
} from "@material-ui/core";
import Page from "src/components/theme/page";
// import { getExampleRecipes } from "src/api/mockAPI";
import { getMultipleRecipes } from "src/components/api/SpoonacularAPI";
import { Scrollbars } from "react-custom-scrollbars";
import CircularProgress from "@material-ui/core/CircularProgress";
import RecipeDialog from "src/components/recipe/RecipeDialog";
import RecipeList from "src/components/recipe/RecipeList";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Favourites = () => {
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

  // useEffect(() => {
  //   setRecipes(getExampleRecipes());
  // }, []);

  useLayoutEffect(() => {
    getUserFavourites().then((res) => {
      loadMultipleRecipes(res.data.favourites);
    });
  }, []);

  return (
    <Scrollbars>
      <Page className={classes.root} title="Recipedia | Favourites">
        <Box m={2}>
          <Container maxWidth="false">
            <Card variant="outlined">
              <CardContent>
                <Box p={1}>
                  <Typography gutterBottom variant="h1">
                    Your favourites.
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    You can view and manage your favourite recipes right here.
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
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {loading ? <CircularProgress /> : null}
              </Grid>
            </Box>
          </Container>
          <RecipeDialog
            open={dlgOpen}
            handleClose={() => setDlgOpen(false)}
            recipeId={selectedRecipeId}
            recipeInfo={selectedRecipeInfo}
          />
        </Box>
      </Page>
    </Scrollbars>
  );

  function loadMultipleRecipes(idsArray) {
    setLoading(true);
    let idsString = idsArray ? idsArray.join(",") : null;
    getMultipleRecipes(idsString)
      .then((res) => {
        console.log(res.data);
        setRecipes([...recipes, ...res.data]);
      })
      .catch((error) => console.log(error))
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

export default Favourites;

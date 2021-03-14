import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Page from "src/components/theme/page";
import RecipeDialog from "src/components/recipe/RecipeDialog";
import RecipeList from "src/components/recipe/RecipeList";
import { Scrollbars } from "react-custom-scrollbars";
import { getRecipesByID } from "src/components/api/SpoonacularAPI";
import { getUserData } from "src/components/auth/UserAuth";

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
  const [loading, setLoading] = useState(false);
  const [selectedRecipeID, setSelectedRecipeID] = useState(0);
  const [selectedRecipeInfo, setSelectedRecipeInfo] = useState({});
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
  const [hasFavourites, setHasFavourites] = useState(true);

  const onRecipeClick = (id) => {
    loadRecipeByID(id);
    setSelectedRecipeID(id);
  };
  const loadMultipleRecipes = (idsArray) => {
    setLoading(true);
    getRecipesByID(idsArray ? idsArray.join(",") : null)
      .then((response) => {
        if (response.data) {
          setRecipeList([...recipeList, ...response.data]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadRecipeByID = (id) => {
    const clickedRecipe = recipeList.find((recipe) => recipe.id === id);
    setSelectedRecipeInfo(clickedRecipe);
    setRecipeDialogOpen(true);
  };

  useLayoutEffect(() => {
    getUserData().then((response) => {
      if (response.data.favourites) {
        console.log(response.data);
        if (response.data.favourites.length > 0) {
          loadMultipleRecipes(response.data.favourites);
        } else {
          setHasFavourites(false);
        }
      } else {
        setHasFavourites(false);
      }
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
              {hasFavourites ? (
                <>
                  <RecipeList
                    recipes={recipeList}
                    onRecipeClick={onRecipeClick}
                    loading={loading}
                  />
                </>
              ) : (
                <>
                  <Box mt={10}>
                    <Typography
                      color="textSecondary"
                      align="center"
                      variant="h3"
                    >
                      You haven't favourited any recipes yet!
                    </Typography>
                  </Box>
                </>
              )}
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {loading ? (
                  <Box mt={6}>
                    <CircularProgress />
                  </Box>
                ) : null}
              </Grid>
            </Box>
          </Container>
          <RecipeDialog
            open={recipeDialogOpen}
            handleClose={() => setRecipeDialogOpen(false)}
            recipeId={selectedRecipeID}
            recipeInfo={selectedRecipeInfo}
          />
        </Box>
      </Page>
    </Scrollbars>
  );
};

export default Favourites;

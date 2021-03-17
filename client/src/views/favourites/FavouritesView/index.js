import {
  Box,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  getRecipesByID,
  getUserData,
  logOut,
} from "src/components/ServerRequests";

import CircularProgress from "@material-ui/core/CircularProgress";
import Page from "src/components/theme/page";
import RecipeDialog from "src/components/recipe/RecipeDialog";
import RecipeList from "src/components/recipe/RecipeList";
import { Scrollbars } from "react-custom-scrollbars";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [loadingFavourites, setLoadingFavourites] = useState(false);
  const [selectedRecipeID, setSelectedRecipeID] = useState(0);
  const [selectedRecipeInfo, setSelectedRecipeInfo] = useState({});
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
  const [hasFavourites, setHasFavourites] = useState(true);
  const [APIKeyUsed, setAPIKeyUsed] = useState(false);

  const handleRecipeClick = (id) => {
    navigate(`/app/favourites/${id}`);
    showRecipeByID(id);
    setSelectedRecipeID(id);
    window.addEventListener("popstate", () => {
      handleRecipeClose();
    });
  };
  const handleRecipeClose = () => {
    setRecipeDialogOpen(false);
    setTimeout(function () {
      document.getElementById("header").scrollIntoView();
    }, 500);
    navigate(`/app/favourites`);
  };

  const loadMultipleRecipes = (idsArray) => {
    setLoadingFavourites(true);
    getRecipesByID(idsArray ? idsArray.join(",") : null)
      .then((response) => {
        if (response.data.code === 402) {
          setAPIKeyUsed(true);
        } else if (response.data) {
          setRecipeList([...recipeList, ...response.data]);
        }
      })
      .finally(() => {
        setLoadingFavourites(false);
      });
  };

  const showRecipeByID = (id) => {
    const clickedRecipe = recipeList.find((recipe) => recipe.id === id);
    setSelectedRecipeInfo(clickedRecipe);
    setRecipeDialogOpen(true);
  };

  useLayoutEffect(() => {
    getUserData().then((response) => {
      if (response.data.favourites) {
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

  useEffect(() => {
    navigate(`/app/favourites`);
  }, []);

  return (
    <Scrollbars>
      <Page className={classes.root} title="Favourites | Recipedia ">
        <Box m={2}>
          <Container maxWidth={false}>
            <Card>
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
                    onRecipeClick={handleRecipeClick}
                    loading={loadingFavourites}
                  />
                </>
              ) : (
                <>
                  <Box mt={6}>
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
                {loadingFavourites ? (
                  <Box mt={6}>
                    <CircularProgress />
                  </Box>
                ) : null}
              </Grid>
            </Box>
          </Container>
          <RecipeDialog
            open={recipeDialogOpen}
            handleClose={handleRecipeClose}
            recipeId={selectedRecipeID}
            recipeInfo={selectedRecipeInfo}
          />
        </Box>
        <Dialog
          open={APIKeyUsed}
          onClose={() => {
            logOut();
            navigate("/");
          }}
        >
          <Box p={1}>
            <DialogContent>
              <DialogContentText>
                <Box alignItems="center" justifyContent="center" display="flex">
                  Unfortunately our API has ran out of requests for today.
                  Please come back tomorrow to find more tasty recipes!
                </Box>
              </DialogContentText>
            </DialogContent>
          </Box>
        </Dialog>
      </Page>
    </Scrollbars>
  );
};

export default Favourites;

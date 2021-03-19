import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
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
  getRecipesComplex,
  getUserData,
  logOut,
} from "src/components/ServerRequests";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
  loadMoreButton: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "15px",
  },
  placeholderText: {
    paddingTop: theme.spacing(4),
  },
}));

const Home = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [selectedRecipeID, setSelectedRecipeID] = useState(0);
  const [selectedRecipeInfo, setSelectedRecipeInfo] = useState({});
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
  const [recipeOffset, setRecipeOffset] = useState(0);
  const [allergens, setAllergens] = useState([]);
  const [diet, setDiet] = useState("");
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [APIKeyUsed, setAPIKeyUsed] = useState(false);
  const [minCalories, setMinCalories] = useState(0);
  const [maxCalories, setMaxCalories] = useState(1000);

  const handleRecipeClick = (id) => {
    navigate(`/app/home/${id}`);
    showRecipeByID(id);
    setSelectedRecipeID(id);
    window.addEventListener("popstate", () => {
      handleRecipeClose();
    });
  };
  const loadRecipes = (
    newAllergens,
    newDiet,
    newMinCalories,
    newMaxCalories,
    offset
  ) => {
    setLoading(true);
    getRecipesComplex(
      newAllergens
        ? newAllergens.join(",")
        : allergens
        ? allergens.join(",")
        : null,
      newDiet ? newDiet : diet ? diet : null,
      null,
      null,
      null,
      offset,
      null,
      newMinCalories ? newMinCalories : minCalories ? minCalories : null,
      newMaxCalories ? newMaxCalories : maxCalories ? maxCalories : null
    )
      .then((response) => {
        if (response.data.code === 402) {
          setAPIKeyUsed(true);
        } else if (response.data.results) {
          if (response.data.results.length === 0) {
            setNoResultsFound(true);
          }
          setRecipeList([...recipeList, ...response.data.results]);
        } else {
          setNoResultsFound(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const showRecipeByID = (id) => {
    setSelectedRecipeInfo(recipeList.find((recipe) => recipe.id === id));
    setRecipeDialogOpen(true);
  };

  const handleRecipeClose = () => {
    setRecipeDialogOpen(false);
    setTimeout(() => {
      document.getElementById("header").scrollIntoView();
    }, 500);
    navigate(`/app/home`);
  };

  useLayoutEffect(() => {
    getUserData().then((response) => {
      if (response.data.message === "loggedIn") {
        setAllergens(response.data.allergens);
        setDiet(response.data.diet);
        if (response.data.health) {
          setMinCalories(response.data.health.minCalories);
          setMaxCalories(response.data.health.maxCalories);
          loadRecipes(
            response.data.allergens,
            response.data.diet,
            response.data.health.minCalories,
            response.data.health.maxCalories,
            0
          );
        } else {
          loadRecipes(
            response.data.allergens,
            response.data.diet,
            null,
            null,
            0
          );
        }
      } else {
        logOut();
      }
    });
  }, []);

  useEffect(() => {
    navigate(`/app/home`);
  }, []);

  const loadMoreRecipes = () => {
    setRecipeOffset(recipeOffset + recipeList.length);
    loadRecipes(null, null, null, null, recipeOffset + recipeList.length);
  };

  return (
    <Scrollbars>
      <Page className={classes.root} title="Home | Recipedia">
        <Box m={2}>
          <Container maxWidth={false}>
            <Card>
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
                recipes={recipeList}
                onRecipeClick={handleRecipeClick}
                loading={loading}
              />
              {noResultsFound ? (
                <>
                  <Box mt={2}>
                    <Typography
                      className={classes.placeholderText}
                      color="textSecondary"
                      align="center"
                      variant="h3"
                    >
                      We couldn't find any more recipes for your health/dietary
                      preferences.
                    </Typography>
                  </Box>
                </>
              ) : null}
            </Box>
            <Grid item xs={12} className={classes.loadMoreButton}>
              <Box mt={3} style={{ display: noResultsFound && "none" }}>
                {loading && !APIKeyUsed ? (
                  <CircularProgress />
                ) : (
                  <>
                    <Button
                      color="primary"
                      onClick={loadMoreRecipes}
                      disabled={APIKeyUsed}
                    >
                      <ExpandMoreIcon /> Load more recipes! <ExpandMoreIcon />
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
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

export default Home;

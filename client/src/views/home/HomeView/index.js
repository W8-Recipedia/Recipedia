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
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  getRecipesComplex,
  getUserData,
} from "src/components/ServerRequests";

import CircularProgress from "@material-ui/core/CircularProgress";
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
  loadMoreGridBtn: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "15px",
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

  const handleRecipeClick = (id) => {
    navigate(`/app/home/${id}`);
    showRecipeByID(id);
    setSelectedRecipeID(id);
    window.addEventListener("popstate", () => {
      setRecipeDialogOpen(false);
    });
  };
  const loadRecipes = (localAllergens = allergens, localDiet = diet) => {
    setLoading(true);
    getRecipesComplex(
      localAllergens ? localAllergens.join(",") : null,
      localDiet,
      null,
      null,
      recipeOffset,
      null,
      true
    )
      .then((response) => {
        if (!response.data.results) {
          // SHOW TEXT FOR ERROR
        } else {
          setRecipeList([...recipeList, ...response.data.results]);
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

  useLayoutEffect(() => {
    getUserData().then((response) => {
      setAllergens(response.data.allergens);
      setDiet(response.data.diet);
      loadRecipes(response.data.allergens, response.data.diet);
    });
  }, []);

  useEffect(() => {
    navigate(`/app/home`);
  }, []);

  const loadMoreRecipes = () => {
    setRecipeOffset(
      recipeOffset + parseInt(process.env.REACT_APP_SEARCH_OFFSET)
    );
    loadRecipes();
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
                recipes={recipeList}
                onRecipeClick={handleRecipeClick}
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
            open={recipeDialogOpen}
            handleClose={() => {
              setRecipeDialogOpen(false);
              navigate(`/app/home`);
            }}
            recipeId={selectedRecipeID}
            recipeInfo={selectedRecipeInfo}
          />
        </Box>
      </Page>
    </Scrollbars>
  );
};

export default Home;

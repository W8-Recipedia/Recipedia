import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  ListItemText,
  MenuItem,
  Select,
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
import Searchbar from "src/pages/search/components/Searchbar";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: () => null,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  placeholderText: {
    paddingTop: theme.spacing(4),
  },
  loadMoreButton: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "15px",
  },
}));

const cuisineNames = [
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

const typeNames = [
  "Appetizer",
  "Beverage",
  "Bread",
  "Breakfast",
  "Dessert",
  "Drink",
  "Fingerfood",
  "Main course",
  "Marinade",
  "Salad",
  "Sauce",
  "Side dish",
  "Snack",
  "Soup",
];

const ingredientNames = [
  "Tomato",
  "Cheese",
  "Potato",
  "Egg",
  "Chicken",
  "Onion",
  "Garlic",
  "Flour",
  "Butter",
  "Salmon",
  "Cod",
  "Haddock",
  "Milk",
  "Beans",
];

const SearchView = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [selectedRecipeID, setSelectedRecipeID] = useState(0);
  const [selectedRecipeInfo, setSelectedRecipeInfo] = useState({});
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
  const [cuisineName, setCuisineName] = useState([]);
  const [typeName, setTypeName] = useState([]);
  const [ingredientName, setIngredientName] = useState([]);
  const [intolerances, setIntolerances] = useState([]);
  const [diet, setDiet] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [recipeOffset, setRecipeOffset] = useState(0);
  const [initialSearch, setInitialSearch] = useState(true);
  const [emptySearch, setEmptySearch] = useState(false);
  const [APIKeyUsed, setAPIKeyUsed] = useState(false);
  const [minCalories, setMinCalories] = useState(0);
  const [maxCalories, setMaxCalories] = useState(1000);

  const loadRecipes = (query = undefined, offset) => {
    setLoadingRecipes(true);
    getRecipesComplex(
      intolerances ? intolerances.join(",") : null,
      diet,
      typeName.join(",").toLowerCase(),
      cuisineName.join(","),
      ingredientName.join(",").toLowerCase(),
      offset,
      query ? query : searchQuery,
      minCalories ? minCalories : 0,
      maxCalories ? maxCalories : 1000
    )
      .then((response) => {
        if (response.data.code === 402) {
          setAPIKeyUsed(true);
        } else if (response.data.results) {
          if (response.data.results.length === 0) {
            setEmptySearch(true);
          } else {
            offset
              ? setRecipeList([...recipeList, ...response.data.results])
              : setRecipeList(response.data.results);
            setLoadMore(true);
          }
        } else {
          setEmptySearch(true);
        }
      })
      .finally(() => {
        setLoadingRecipes(false);
      });
  };

  const loadRecipeByID = (id) => {
    navigate(`/app/search/${id}`);
    setSelectedRecipeInfo(recipeList.find((recipe) => recipe.id === id));
    setRecipeDialogOpen(true);
    window.addEventListener("popstate", () => {
      handleRecipeClose();
    });
  };
  const handleRecipeClose = () => {
    setRecipeDialogOpen(false);
    setTimeout(function () {
      document.getElementById("header").scrollIntoView();
    }, 500);
    navigate(`/app/search`);
  };

  useLayoutEffect(() => {
    getUserData().then((response) => {
      if (response.data.message === "loggedIn") {
        setIntolerances(response.data.allergens);
        setDiet(response.data.diet);
        if (response.data.health) {
          setMinCalories(response.data.health.minCalories);
          setMaxCalories(response.data.health.maxCalories);
        }
      } else {
        logOut();
      }
    });
  }, []);

  useEffect(() => {
    navigate(`/app/search`);
  }, []);

  const handleChangeCuisine = (event) => {
    setCuisineName(event.target.value);
  };

  const handleChangeType = (event) => {
    setTypeName(event.target.value);
  };

  const handleChangeIngredient = (event) => {
    setIngredientName(event.target.value);
  };

  const handleQuerySearch = (query) => {
    setRecipeList([]);
    setSearchQuery(query);
    setInitialSearch(false);
    setEmptySearch(false);
    loadRecipes(query, 0);
  };

  const loadMoreRecipes = () => {
    setRecipeOffset(recipeOffset + recipeList.length);
    loadRecipes(null, recipeOffset + recipeList.length);
  };

  const onRecipeClick = (id) => {
    loadRecipeByID(id);
    setSelectedRecipeID(id);
  };

  return (
    <Scrollbars>
      <Page className={classes.root} title="Search | Recipedia">
        <Box m={2}>
          <Container maxWidth={false}>
            <Card>
              <CardContent>
                <Box p={1}>
                  <Typography gutterBottom variant="h1">
                    Search here.
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    If you'd like to find recipes that match your specific
                    tastes, then you're in the right place.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Container>
          <Container maxWidth={false}>
            <Box mt={3}>
              <Card>
                <Box p={2}>
                  <Grid container spacing={3}>
                    <Searchbar onSubmit={handleQuerySearch} />
                    <Grid item md={3} xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Type</InputLabel>
                        <Select
                          multiple
                          fullWidth
                          label="Type"
                          value={typeName}
                          onChange={handleChangeType}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          {typeNames.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={typeName.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Cuisine</InputLabel>
                        <Select
                          multiple
                          fullWidth
                          label="Cuisine"
                          value={cuisineName}
                          onChange={handleChangeCuisine}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          {cuisineNames.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox
                                checked={cuisineName.indexOf(name) > -1}
                              />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* <Grid item md={2} xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Ingredients</InputLabel>
                        <Select
                          multiple
                          fullWidth
                          label="Ingredients"
                          value={ingredientName}
                          onChange={handleChangeIngredient}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          {ingredientNames.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox
                                checked={ingredientName.indexOf(name) > -1}
                              />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid> */}
                  </Grid>
                </Box>
              </Card>
            </Box>
            <Box mt={2}>
              {!initialSearch && (
                <RecipeList
                  recipes={recipeList}
                  onRecipeClick={onRecipeClick}
                  loading={loadingRecipes}
                />
              )}
              {initialSearch || emptySearch ? (
                <Box mt={2}>
                  <Typography
                    className={classes.placeholderText}
                    color="textSecondary"
                    align="center"
                    variant="h3"
                  >
                    {initialSearch ? (
                      "Start searching to find your new favourite recipes!"
                    ) : emptySearch && recipeList.length !== 0 ? (
                      <Box pt={2}>
                        No more recipes found for your health/dietary
                        preferences.
                      </Box>
                    ) : (
                      "We couldn't find any recipes for your health/dietary preferences."
                    )}
                  </Typography>
                </Box>
              ) : null}
              <Grid item xs={12}>
                <Box mt={3}>
                  {loadingRecipes && !APIKeyUsed ? <LinearProgress /> : null}
                </Box>
              </Grid>

              <Grid item xs={12} className={classes.loadMoreButton}>
                <Box>
                  {loadMore && !loadingRecipes && !emptySearch ? (
                    <>
                      <Button
                        color="primary"
                        onClick={loadMoreRecipes}
                        disabled={APIKeyUsed}
                      >
                        <ExpandMoreIcon /> Load more recipes! <ExpandMoreIcon />
                      </Button>
                    </>
                  ) : null}
                </Box>
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
      </Page>
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
                Unfortunately our API has ran out of requests for today. Please
                come back tomorrow to find more tasty recipes!
              </Box>
            </DialogContentText>
          </DialogContent>
        </Box>
      </Dialog>
    </Scrollbars>
  );
};

export default SearchView;

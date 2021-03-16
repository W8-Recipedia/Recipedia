import {} from "src/components/ServerRequests";

import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Grid,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getRecipesComplex, getUserData } from "src/components/ServerRequests";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LinearProgress from "@material-ui/core/LinearProgress";
import Page from "src/components/theme/page";
import RecipeDialog from "src/components/recipe/RecipeDialog";
import RecipeList from "src/components/recipe/RecipeList";
import { Scrollbars } from "react-custom-scrollbars";
import Searchbar from "src/views/search/SearchView/components/Searchbar";
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
  loadMoreGridBtn: {
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
  "Main course",
  "Side dish",
  "Dessert",
  "Appetizer",
  "Salad",
  "Bread",
  "Breakfast",
  "Soup",
  "Beverage",
  "Sauce",
  "Marinade",
  "Fingerfood",
  "Snack",
  "Drink",
];

const SearchView = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [selectedRecipeID, setSelectedRecipeID] = useState(0);
  const [selectedRecipeInfo, setSelectedRecipeInfo] = useState({});
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
  const [cuisineName, setCuisineName] = useState([]);
  const [typeName, setTypeName] = useState([]);
  const [intolerances, setIntolerances] = useState([]);
  const [diet, setDiet] = useState("");
  const [query, setQuery] = useState("");
  const [recipeOffset, setRecipeOffset] = useState(0);
  const [initialSearch, setInitialSearch] = useState(true);
  const [emptySearch, setEmptySearch] = useState(false);

  const loadRecipes = (queryNew = undefined, offset) => {
    setLoading(true);
    getRecipesComplex(
      intolerances ? intolerances.join(",") : null,
      diet,
      typeName.join(",").toLowerCase(),
      cuisineName.join(","),
      offset,
      queryNew ? queryNew : query,
      false
    )
      .then((response) => {
        if (response.data.results) {
          if (response.data.code === 402) {
            // set popup for api
          } else if (response.data.results.length === 0) {
            setEmptySearch(true);
          } else {
            setRecipeList([...recipeList, ...response.data.results]);
            setLoadMore(true);
          }
        }
      })
      .finally(() => {
        setLoading(false);
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
    }, 300);
    navigate(`/app/search`);
  };
  useLayoutEffect(() => {
    getUserData().then((response) => {
      setIntolerances(response.data.allergens);
      setDiet(response.data.diet);
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

  const handleQuerySearch = (queryNew) => {
    setRecipeList([]);
    setQuery(queryNew);
    setInitialSearch(false);
    setEmptySearch(false);
    loadRecipes(queryNew);
  };

  const loadMoreRecipes = () => {
    setRecipeOffset(
      recipeOffset + parseInt(process.env.REACT_APP_SEARCH_OFFSET)
    );
    loadRecipes(
      null,
      recipeOffset + parseInt(process.env.REACT_APP_SEARCH_OFFSET)
    );
  };

  const onRecipeClick = (id) => {
    loadRecipeByID(id);
    setSelectedRecipeID(id);
  };

  return (
    <Scrollbars>
      <Page className={classes.root} title="Search | Recipedia">
        <Box m={2}>
          <Container maxWidth="false">
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
                    taste, then you're in the right place.
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
                      <InputLabel>Type</InputLabel>
                      <Select
                        multiple
                        fullWidth
                        value={typeName}
                        onChange={handleChangeType}
                        input={<Input />}
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
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <InputLabel>Cuisine</InputLabel>
                      <Select
                        multiple
                        fullWidth
                        value={cuisineName}
                        onChange={handleChangeCuisine}
                        input={<Input />}
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
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Box>
            <Box mt={3}>
              {initialSearch || emptySearch ? (
                <>
                  <Typography
                    className={classes.placeholderText}
                    color="textSecondary"
                    align="center"
                    variant="h3"
                  >
                    {initialSearch
                      ? "Start searching to find your new favourite recipes!"
                      : "No results found (for your dietary preferences)."}
                  </Typography>
                </>
              ) : (
                <>
                  <RecipeList
                    recipes={recipeList}
                    onRecipeClick={onRecipeClick}
                    loading={loading}
                  />
                </>
              )}
              <Grid item xs={12}>
                <Box mt={3}>{loading ? <LinearProgress /> : null}</Box>
              </Grid>

              <Grid item xs={12} className={classes.loadMoreGridBtn}>
                <Box>
                  {loadMore && !loading ? (
                    <>
                      <Button color="primary" onClick={loadMoreRecipes}>
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
    </Scrollbars>
  );
};

export default SearchView;

import React, { useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
// import { getExampleRecipes } from "src/api/mockAPI";
import { getRecipesComplex } from "src/api/SpoonacularAPI";
import RecipeCardList from "src/views/search/SearchView/components/RecipeCardList";
import Searchbar from "src/views/search/SearchView/components/Searchbar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const SearchView = () => {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [offset] = useState(0);
  const [ingredients] = useState([]);
  const [diets] = useState([]);
  const [intolerances] = useState([]);
  
  const handleQuerySearch = (query) => {
    setSearchQuery(query);
    loadRecipes([], ingredients, intolerances, 0, query);
  };

  //// USED FOR TESTING
  // useEffect(() => {
  //   setRecipes(getExampleRecipes());
  // }, []);

  return (
    <Page className={classes.root} title="Recipedia | Search">
      <Container maxWidth={false}>
        <Searchbar onSubmit={handleQuerySearch} />
        <Box mt={3}>
          <RecipeCardList recipes={recipes} />
        </Box>
      </Container>
    </Page>
  );

  function loadRecipes(
    ingredientsArray,
    intolerancesArray,
    dietsArray,
    offset,
    query
  ) {
    let ingredientsString = ingredientsArray.map((o) => o.name).join(",");
    let intolerancesString = intolerancesArray.join(",");
    let dietsString = dietsArray.join(",");
    getRecipesComplex(
      ingredientsString,
      intolerancesString,
      dietsString,
      offset,
      query
    )
      .then((res) => {
        console.log("recipes:", res.data);
        offset
          ? setRecipes([...recipes, ...res.data.results])
          : setRecipes(res.data.results);
      })
      .catch((error) => console.log(error))
  }
};

export default SearchView;

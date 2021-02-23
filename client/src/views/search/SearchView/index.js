import React, { useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
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
  const [recipes] = useState("");
  const [selectedRecipeIds, setSelectedRecipeIds] = useState([]);

  return (
    <Page className={classes.root} title="Recipedia | Search">
      <Container maxWidth={false}>
        <Searchbar />
        <Box mt={3}>
          <RecipeCardList recipes={recipes} />
        </Box>
      </Container>
    </Page>
  );
};

export default SearchView;

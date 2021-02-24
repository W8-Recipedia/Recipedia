import React from "react";
import PropTypes from "prop-types";
import RecipeCard from "src/views/search/SearchView/components/RecipeCard";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Grid } from "@material-ui/core";

const RecipeCardList = ({ recipes }) => {
  return (
    <PerfectScrollbar>
      <Grid container spacing={2}>
        {recipes.map((recipeItem) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <RecipeCard recipe={recipeItem} />
          </Grid>
        ))}
        <Grid item xs={12}></Grid>
      </Grid>
    </PerfectScrollbar>
  );
};

RecipeCardList.propTypes = {
  recipes: PropTypes.array.isRequired,
};

export default RecipeCardList;

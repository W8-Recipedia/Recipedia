import React from "react";
import PropTypes from "prop-types";
import FavRecipeCard from "src/views/favourites/FavouritesView/components/FavRecipeCard";
import { Grid } from "@material-ui/core";

const FavRecipeList = ({ recipes, onRecipeClick, loadMore }) => {
  return (
      <Grid container spacing={2}>
        {recipes.map((recipeItem) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <FavRecipeCard recipe={recipeItem} onClick={onRecipeClick} />
          </Grid>
        ))}
      </Grid>
      
      
  );
};

FavRecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  onRecipeClick: PropTypes.func.isRequired,
  loadMore: PropTypes.func,
};

export default FavRecipeList;

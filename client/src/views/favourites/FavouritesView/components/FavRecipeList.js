import React from "react";
import PropTypes from "prop-types";
import RecipeCard from "src/components/recipe/RecipeCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";

const FavRecipeList = ({ recipes, onRecipeClick, loadMore, loading }) => {
  return (
    <Grid container spacing={2}>
      {recipes.map((recipeItem) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <RecipeCard recipe={recipeItem} onClick={onRecipeClick} />
        </Grid>
      ))}
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
          </>
        )}
      </Grid>
    </Grid>
  );
};

FavRecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  onRecipeClick: PropTypes.func.isRequired,
  loadMore: PropTypes.func,
  loading: PropTypes.bool,
};

export default FavRecipeList;

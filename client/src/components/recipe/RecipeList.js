import React from "react";
import RecipeCard from "src/components/recipe/RecipeCard";
import { Grid } from "@material-ui/core";

const RecipeCardList = ({ recipes, onRecipeClick }) => {
  return (
    <Grid container spacing={2}>
      {recipes.map((recipeItem) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <RecipeCard recipe={recipeItem} onClick={onRecipeClick} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeCardList;

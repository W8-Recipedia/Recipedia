import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import RecipeCard from "src/views/home/HomeView/components/RecipeCard";
import { Grid, Button } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";


const useStyles = makeStyles({
  loadMoreGridBtn: {
    display: "flex",
    justifyContent: "center",
  },
});

const RecipeCardList = ({ recipes, onRecipeClick, loadMore }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {recipes.map((recipeItem) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <RecipeCard recipe={recipeItem} onClick={onRecipeClick} />
        </Grid>
      ))}
      <Grid item xs={12} className={classes.loadMoreGridBtn}>
        <Button color="primary" onClick={loadMore}>
          <ArrowDownwardIcon fontSize="small" />
          Load more recipes!
          <ArrowDownwardIcon fontSize="small" />
        </Button>
      </Grid>
    </Grid>
  );
};

RecipeCardList.propTypes = {
  recipes: PropTypes.array.isRequired,
  onRecipeClick: PropTypes.func.isRequired,
  loadMore: PropTypes.func,
};

export default RecipeCardList;

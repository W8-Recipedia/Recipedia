import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import RecipeCard from "src/views/home/HomeView/components/RecipeCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid, Button } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const useStyles = makeStyles({
  loadMoreGridBtn: {
    display: "flex",
    justifyContent: "center",
  },
  downArrow: {
    fontSize: "15px",
  },
});

const RecipeCardList = ({ recipes, onRecipeClick, loadMore, loading }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {recipes.map((recipeItem) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <RecipeCard recipe={recipeItem} onClick={onRecipeClick} />
        </Grid>
      ))}
      <Grid item xs={12} className={classes.loadMoreGridBtn}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Button color="primary" onClick={loadMore}>
              <ArrowDownwardIcon className={classes.downArrow} /> Load more
              recipes! <ArrowDownwardIcon className={classes.downArrow} />
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
};

RecipeCardList.propTypes = {
  recipes: PropTypes.array.isRequired,
  onRecipeClick: PropTypes.func.isRequired,
  loadMore: PropTypes.func,
  loading: PropTypes.bool,
};

export default RecipeCardList;

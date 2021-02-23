import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Card,
  makeStyles,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const RecipeCardList = ({ className, recipes, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
      <Grid container spacing={2}>
      {
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            {/* <RecipeCard recipe={r} /> */}
          </Grid>
      }
      <Grid item xs={12}>
      </Grid>
    </Grid>

      </PerfectScrollbar>
    </Card>
  );
};

RecipeCardList.propTypes = {
  recipes: PropTypes.array.isRequired,
};

export default RecipeCardList;

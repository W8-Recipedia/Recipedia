import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  makeStyles,
} from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/Schedule";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";

function convertTime(num) {
  if (num <= 60) {
    return `${num} minutes`;
  }
  let hours = num / 60;
  let rHours = Math.floor(hours);
  let minutes = (hours - rHours) * 60;
  let rMinutes = Math.round(minutes);
  return `${rHours} hour${rHours > 1 ? "s" : ""} ${rMinutes} minutes`;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    maxWidth: 400,
  },
}));

const RecipeCard = ({ recipe, ...props }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={4}>
      <CardContent>
        <Typography
          variant="h6"
          component="h3"
          color="textPrimary"
          align="center"
        >
          {recipe.title}
        </Typography>
      </CardContent>
      <CardActions>
        <div
          style={{ display: "flex", alignItems: "center" }}
          title="Prep time"
        >
          <ScheduleIcon color="primary" style={{ marginRight: 6 }} />{" "}
          <Typography variant="subtitle2" color="textSecondary">
            {convertTime(recipe.readyInMinutes)}
          </Typography>
        </div>
        <div
          style={{ display: "flex", alignItems: "center" }}
          title="Favourite me!"
        >
          <IconButton component="span">
            <FavoriteBorderIcon style={{ color: "red" }} />
          </IconButton>
          <Typography variant="subtitle2" color="textSecondary">
            Favourite
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeCard;

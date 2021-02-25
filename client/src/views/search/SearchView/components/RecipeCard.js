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
    "&:hover": {
      "& img": {
        opacity: 0.2,
      },
      "& div": {
        visibility: "visible",
      },
    },
  },
  media: {
    overflow: "hidden",
    height: 190,
    position: "relative",
  },
  recipeButton: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 8,
    visibility: "hidden",
  },
  image: {
    width: "100%",
    transition: "opacity 250ms ease",
    backfaceVisibility: "hidden",
  },
}));

const RecipeCard = ({ recipe, ...props }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={4} onClick={() => props.onClick(recipe.id)}>
      <div className={classes.media}>
        <img
          className={classes.image}
          src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType}`}
          alt={recipe.title}
        />
        <div className={classes.recipeButton}>
          <Typography variant="button">
            Click for the recipe!
          </Typography>
        </div>
      </div>
      <CardContent>
        <Typography
          variant="h3"
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
          <ScheduleIcon color="primary" style={{ marginRight: 8 }} />{" "}
          <Typography variant="subtitle2" color="textSecondary">
            {convertTime(recipe.readyInMinutes)}
          </Typography>
        </div>
        <div
          style={{ display: "flex", alignItems: "center" }}
          title="Favourite me!"
        >
          <IconButton component="span" style={{ marginLeft: 8 }}>
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
  onClick: PropTypes.func.isRequired,
};

export default RecipeCard;

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { React, useLayoutEffect, useState } from "react";
import {
  addToFavourites,
  getUserData,
  removeFromFavourites,
} from "src/components/ServerRequests";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { useSnackbar } from "notistack";

const convertTime = (num) => {
  if (num <= 60) {
    return `${num}m`;
  }
  let hours = num / 60;
  let rHours = Math.floor(hours);
  let minutes = (hours - rHours) * 60;
  let rMinutes = Math.round(minutes);
  return `${rHours}h ${rMinutes}m`;
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
  const [favourited, setFavourited] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useLayoutEffect(() => {
    getUserData().then((response) => {
      if (response.data.favourites) {
        if (response.data.favourites.includes(recipe.id.toString())) {
          setFavourited(true);
        }
      }
    });
  }, []);

  const handleFavouriteClick = () => {
    if (!favourited) {
      addToFavourites(recipe.id);
      enqueueSnackbar(`${recipe.title} has been added to favourites.`, {
        variant: "success",
        autoHideDuration: 1200,
      });
    } else {
      removeFromFavourites(recipe.id);
      enqueueSnackbar(`${recipe.title} has been removed from favourites.`, {
        variant: "info",
        autoHideDuration: 1200,
      });
    }
    setFavourited((prevFavourited) => !prevFavourited);
  };

  return (
    <Card className={classes.root} elevation={4}>
      <div onClick={() => props.onClick(recipe.id)} className={classes.media}>
        <img
          className={classes.image}
          src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType}`}
          alt={recipe.title}
        />
        <div className={classes.recipeButton}>
          <Typography variant="button">Click here for the recipe!</Typography>
        </div>
      </div>
      <CardContent onClick={() => props.onClick(recipe.id)}>
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
        <Grid container justify="center">
          <Grid item md={6}>
            <Box justifyContent="flex-start" alignItems="center">
              <IconButton disabled>
                <LocalDiningIcon color="primary" />
              </IconButton>
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Servings: {recipe.servings}
              </Typography>
            </Box>
          </Grid>
          <Box justifyContent="center" alignItems="center"></Box>
          <Grid item md={6}>
            <Box justifyContent="flex-end" alignItems="center">
              <IconButton disabled>
                <ScheduleIcon color="primary" />
              </IconButton>
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Time: {convertTime(recipe.readyInMinutes)}
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <IconButton onClick={handleFavouriteClick}>
              {favourited ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon style={{ color: "red" }} />
              )}
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;

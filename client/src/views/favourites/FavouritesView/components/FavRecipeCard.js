import { React, useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { addToFavourites, removeFromFavourites } from "src/components/auth/UserAuth";
import ScheduleIcon from "@material-ui/icons/Schedule";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from "@material-ui/core/IconButton";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function convertTime(num) {
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

const FavRecipeCard = ({ recipe, ...props }) => {
  const classes = useStyles();
  const[favourited, setFavourited] = useState(false);
  const[open, setOpen] = useState(false);

  const handleClick = () => {
    if (!favourited) {
      removeFromFavourites(recipe.id);
    } else {
      addToFavourites(recipe.id);
    }
    setOpen(false);
    setFavourited(prevFavourited => !prevFavourited);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Card
      className={classes.root}
      elevation={4}
    >
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
          <Grid className={classes.statsItem} item md={6}>
            <IconButton disabled>
              <LocalDiningIcon color="primary" />
            </IconButton>
            <Typography color="textSecondary" display="inline" variant="body2">
              Servings: {recipe.servings}
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item md={6}>
            <IconButton disabled>
              <ScheduleIcon color="primary" />
            </IconButton>
            <Typography color="textSecondary" display="inline" variant="body2">
              Time: {convertTime(recipe.readyInMinutes)}
            </Typography>
          </Grid>

          <Grid className={classes.statsItem} item>
            <IconButton onClick={handleClick}>
            {!favourited ? (
              <>
              <FavoriteIcon style={{ color: "red" }} />
              <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="success">
                  {recipe.title} has been added to your favourites.
                </Alert>
              </Snackbar>
              </>
        ) : (
          <>
            <FavoriteBorderIcon style={{ color: "red" }} />
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="info">
                  {recipe.title} has been removed from your favourites.
                </Alert>
              </Snackbar>
          </>
        )}
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

FavRecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FavRecipeCard;

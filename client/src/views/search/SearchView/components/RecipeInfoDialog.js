import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  AppBar,
  Toolbar,
  Grid,
  Link,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

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
  extraInfo: {
    padding: `4px 0`,
    marginBottom: theme.spacing(2),
  },
  imgContainer: {
    maxHeight: 400,
    overflow: "hidden",
  },
  image: {
    width: "100%",
  },
  title: {
    flexGrow: 1,
  },
  list: {
    marginBottom: theme.spacing(1),
  },
  methodListItem: {
    alignItems: "baseline",
  },
  appBar: {
    position: "relative",
  },
}));


const RecipeInfoDialog = ({ open, handleClose, recipeId, recipeInfo }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-labelledby="recipe-dialog"
      fullScreen={fullScreen}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            {recipeInfo.title}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <div className={classes.imgContainer}>
          <img
            className={classes.image}
            src={`https://spoonacular.com/recipeImages/${recipeId}-636x393.${recipeInfo.imageType}`}
            alt={recipeInfo.title}
          />
        </div>
        <Grid container className={classes.extraInfo}>
          <Grid item xs={8} sm={6}>
            <Typography variant="subtitle2" color="textPrimary">
              <span style={{ color: "#3f51b5" }}>You can prepare this recipe in </span>
              {convertTime(recipeInfo.readyInMinutes)}!
            </Typography>
            <Typography variant="subtitle2" color="textPrimary">
              <span style={{ color: "#3f51b5" }}>This recipe serves </span>
              {recipeInfo.servings} person(s).
            </Typography>
          </Grid>
          <Grid item xs={4} sm={6} className={classes.iconContainer}>
          </Grid>
        </Grid>
        <Typography variant="h4">
            Ingredients
          </Typography>
        <List className={classes.list} dense>
          {recipeInfo.extendedIngredients &&
            recipeInfo.extendedIngredients.map((item) => (
              <ListItem
                key={item.original}
                title={`metric: ${item.measures?.metric?.amount} ${item.measures?.metric?.unitShort} / US: ${item.measures?.us?.amount} ${item.measures?.us?.unitShort}`}
              >
                <ListItemIcon style={{ minWidth: 32 }}>
                  <FiberManualRecordIcon fontSize="small" />
                </ListItemIcon> 
                <ListItemText primary={item.original} />
              </ListItem>
            ))}
        </List>
        <Typography variant="h4">Instructions</Typography>
        <List className={classes.list} dense>
          {recipeInfo.analyzedInstructions &&
            recipeInfo.analyzedInstructions[0] &&
            recipeInfo.analyzedInstructions[0].steps.map((step) => (
              <ListItem
                className={classes.methodListItem}
                key={`step_${step.number}_${recipeId}`}
              >
                <ListItemIcon style={{ minWidth: 32 }}>
                  {step.number})
                </ListItemIcon>
                <ListItemText primary={step.step} />
              </ListItem>
            ))}
        </List>
        <Typography variant="caption" gutterBottom>
          This recipe is courtesy of {" "}
          <Link
            href={recipeInfo.sourceUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            '{recipeInfo.sourceName || "source"}'.
          </Link>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

RecipeInfoDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  recipeId: PropTypes.number,
  recipeInfo: PropTypes.object.isRequired,
};

export default RecipeInfoDialog;

import {
  AppBar,
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";

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
  image: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  dialog: {
    padding: theme.spacing(0),
  },
}));

const RecipeDialog = ({ open, handleClose, recipeId, recipeInfo }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  const [checked, setChecked] = useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-labelledby="recipe-dialog"
      fullScreen={fullScreen}
      scroll="body"
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
      <DialogContent className={classes.dialog}>
        <img
          className={classes.image}
          src={`https://spoonacular.com/recipeImages/${recipeId}-636x393.${recipeInfo.imageType}`}
          alt={recipeInfo.title}
        />
      </DialogContent>
      <DialogContent>
        <Grid container className={classes.extraInfo}>
          <Grid item>
            <Typography
              inline
              variant="subtitle2"
              color="textPrimary"
              align="left"
            >
              Servings: {recipeInfo.servings}
            </Typography>
            <Typography
              inline
              variant="subtitle2"
              color="textPrimary"
              align="right"
            >
              Time: {convertTime(recipeInfo.readyInMinutes)}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h4">Ingredients</Typography>

        <List className={classes.list} dense>
          {recipeInfo.extendedIngredients &&
            recipeInfo.extendedIngredients.map((item) => {
              const labelId = `checkbox-list-label-${item}`;
              return (
                <ListItem
                  key={item}
                  onClick={handleToggle(item)}
                  style={{
                    textDecoration:
                      checked.indexOf(item) !== -1 ? "line-through" : "none",
                  }}
                >
                  <ListItemIcon style={{ minWidth: 32 }}>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(item) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.original} />
                </ListItem>
              );
            })}
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
                  <Typography>{step.number})</Typography>
                </ListItemIcon>
                <ListItemText primary={step.step} />
              </ListItem>
            ))}
        </List>
        <Box pb={1}>
          <Typography variant="caption">
            This recipe is courtesy of{" "}
            <Link
              href={recipeInfo.sourceUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {recipeInfo.sourceName || "source"}
            </Link>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

RecipeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  recipeId: PropTypes.number,
  recipeInfo: PropTypes.object.isRequired,
};

export default RecipeDialog;

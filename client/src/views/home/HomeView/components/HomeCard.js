import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
}));

const HomeCard = ({ className, recipe, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="left" mb={3}>
          <Avatar alt="Recipe" src={recipe.media} variant="square" />
        </Box>
        <Typography align="left" color="textPrimary" gutterBottom variant="h4">
          {recipe.title}
        </Typography>
        <Typography align="left" color="textPrimary" variant="body1">
          {recipe.description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <IconButton component="span">
              <FavoriteBorderIcon style={{ color: "red" }} />
            </IconButton>
            <Box pl={1}>
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Add to favourites
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

HomeCard.propTypes = {
  className: PropTypes.string,
  recipe: PropTypes.object.isRequired,
};

export default HomeCard;

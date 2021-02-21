import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  TextField,
  makeStyles,
  Avatar,
  colors,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import EqualizerOutlinedIcon from "@material-ui/icons/EqualizerOutlined";

const useStyles = makeStyles({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56,
  },
});

const Preferences = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader
          subheader="Manage your preferences here"
          title="Preferences"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography color="textPrimary" gutterBottom variant="h6">
                Diet
              </Typography>
              <FormControlLabel control={<Checkbox />} label="Vegan" />
              <FormControlLabel control={<Checkbox />} label="Vegetarian" />
              <FormControlLabel control={<Checkbox />} label="Paleo" />
              <FormControlLabel control={<Checkbox />} label="Primal" />
              <FormControlLabel control={<Checkbox />} label="Whole30" />
              <FormControlLabel
                control={<Checkbox />}
                label="Lacto-vegeterian"
              />
              <FormControlLabel control={<Checkbox />} label="Ovo-vegetarian" />
              <FormControlLabel control={<Checkbox />} label="Pescetarian" />
              <FormControlLabel control={<Checkbox />} label="Ketogenic" />
              <FormControlLabel control={<Checkbox />} label="Gluten free" />
            </Grid>
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography color="textPrimary" gutterBottom variant="h6">
                Allergens
              </Typography>
              <FormControlLabel control={<Checkbox />} label="Dairy" />
              <FormControlLabel control={<Checkbox />} label="Egg" />
              <FormControlLabel control={<Checkbox />} label="Gluten" />
              <FormControlLabel control={<Checkbox />} label="Grain" />
              <FormControlLabel control={<Checkbox />} label="Peanut" />
              <FormControlLabel control={<Checkbox />} label="Seafood" />
              <FormControlLabel control={<Checkbox />} label="Shellfish" />
              <FormControlLabel control={<Checkbox />} label="Soy" />
              <FormControlLabel control={<Checkbox />} label="Tree nut" />
              <FormControlLabel control={<Checkbox />} label="Wheat" />
            </Grid>
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography color="textPrimary" gutterBottom variant="h6">
                Health Metrics
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Height (cm)"
                    type="number"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Weight (kg)"
                    type="number"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Card className={clsx(classes.root, className)} {...rest}>
                    <CardContent>
                      <Grid container justify="space-between" spacing={3}>
                        <Grid item>
                          <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="h6"
                          >
                            BMI
                          </Typography>
                          <Typography color="textPrimary" variant="h3">
                            19.2 {/*  MAKE DYNAMIC */}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Avatar className={classes.avatar}>
                            <EqualizerOutlinedIcon />
                          </Avatar>
                        </Grid>
                      </Grid>
                      <Box mt={2} display="flex" alignItems="center">
                        <ArrowUpwardIcon className={classes.differenceIcon} />
                        <Typography
                          className={classes.differenceValue}
                          variant="body2"
                        >
                          16% {/*  MAKE DYNAMIC */}
                        </Typography>
                        <Typography color="textSecondary" variant="caption">
                          Since last month
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Preferences.propTypes = {
  className: PropTypes.string,
};

export default Preferences;

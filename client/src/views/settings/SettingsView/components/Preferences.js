import React, { useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  TextField,
  makeStyles,
  Avatar,
  colors,
} from "@material-ui/core";
import EqualizerOutlinedIcon from "@material-ui/icons/EqualizerOutlined";
import {
  getUserPreferences,
  changePreferences,
} from "src/components/auth/UserAuth";

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
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [diets, setDiets] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();

  useLayoutEffect(() => {
    getUserPreferences().then((response) => {
      console.log(response);
    });
  }, []);

  const handleDietChange = (dietInput) => {
    diets.includes(dietInput)
      ? setDiets(diets.filter((diet) => diet !== dietInput))
      : diets.push(dietInput);
  };

  const handleAllergenChange = (allergenInput) => {
    allergens.includes(allergenInput)
      ? setAllergens(allergens.filter((allergen) => allergen !== allergenInput))
      : allergens.push(allergenInput);
  };

  const handleSubmit = () => {
    changePreferences(diets, allergens, height, weight).then((response) => {
      console.log(response);
      if (response.data.err) {
        setError(true);
        setOpen(true);
      } else if (response) {
        setError(false);
        setOpen(true);
      }
    });
  };

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
              {[
                "Vegan",
                "Vegetarian",
                "Paleo",
                "Primal",
                "Whole30",
                "Lacto-vegetarian",
                "Ovo-vegetarian",
                "Pescetarian",
                "Ketogenic",
                "Gluten free",
              ].map((diet) => (
                <FormControlLabel
                  control={<Checkbox name="diet" />}
                  onChange={() => handleDietChange(diet)}
                  key={diet}
                  label={diet}
                />
              ))}
            </Grid>
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography color="textPrimary" gutterBottom variant="h6">
                Allergens
              </Typography>
              {[
                "Dairy",
                "Egg",
                "Gluten",
                "Grain",
                "Peanut",
                "Seafood",
                "Shellfish",
                "Soy",
                "Tree nut",
                "Wheat",
              ].map((allergen) => (
                <FormControlLabel
                  control={<Checkbox name="allergen" />}
                  onChange={() => handleAllergenChange(allergen)}
                  key={allergen}
                  label={allergen}
                />
              ))}
            </Grid>
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography color="textPrimary" gutterBottom variant="h6">
                Health Metrics
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Height (cm)"
                    type="number"
                    variant="outlined"
                    onChange={(e) => setHeight(e.target.value)}
                    value={height}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Weight (kg)"
                    type="number"
                    variant="outlined"
                    onChange={(e) => setWeight(e.target.value)}
                    value={weight}
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
                            {weight == 0 || height == 0 || !weight || !height
                              ? "Undefined"
                              : weight / ((height / 100) ^ 2) > 100
                              ? "100+"
                              : Math.round(
                                  (weight * 10) / ((height / 100) ^ 2)
                                ) / 10}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Avatar className={classes.avatar}>
                            <EqualizerOutlinedIcon />
                          </Avatar>
                        </Grid>
                      </Grid>
                      <Typography color="textSecondary" variant="caption">
                        {weight / ((height / 100) ^ 2) == 0 ||
                        weight == 0 ||
                        height == 0 ||
                        !weight ||
                        !height
                          ? "Please enter your details"
                          : weight / ((height / 100) ^ 2) < 18.5
                          ? "Underweight"
                          : weight / ((height / 100) ^ 2) < 25
                          ? " Normal weight"
                          : weight / ((height / 100) ^ 2) < 30
                          ? " Overweight"
                          : "Obese"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Update
          </Button>
        </Box>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={() => {
            setOpen(false);
          }}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {error
                ? "Your preferences could not be updated. Please try again later."
                : "Your preferences have been updated."}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Card>
    </form>
  );
};

Preferences.propTypes = {
  className: PropTypes.string,
};

export default Preferences;

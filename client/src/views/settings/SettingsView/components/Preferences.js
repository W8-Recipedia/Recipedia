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
  Radio,
  RadioGroup,
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
  const [diet, setDiet] = useState("");
  const [allergens, setAllergens] = useState({
    Dairy: false,
    Egg: false,
    Gluten: false,
    Grain: false,
    Peanut: false,
    Seafood: false,
    Shellfish: false,
    Soy: false,
    TreeNut: false,
    Wheat: false,
  });
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  useLayoutEffect(() => {
    getUserPreferences().then((authResponse) => {
      if (authResponse.data.loggedIn) {
        setDiet(authResponse.data.diet);
        for (var allergen in allergens) {
          if (allergens.hasOwnProperty(allergen)) {
            if (authResponse.data.allergens.includes(allergen)) {
              if (allergen == "TreeNut") {
                allergens[TreeNut] = true;
              } else {
                allergens[allergen] = true;
              }
            }
          }
        }
        setHeight(authResponse.data.health.height);
        setWeight(authResponse.data.health.weight);
      }
    });
  }, []);

  const handleDietChange = (event) => {
    setDiet(event.target.value);
  };

  const handleAllergenChange = (event) => {
    setAllergens({ ...allergens, [event.target.name]: event.target.checked });
  };

  const handleSubmit = () => {
    var allergenList = [];
    for (var allergen in allergens) {
      if (allergens.hasOwnProperty(allergen)) {
        if (allergens[allergen] == true) {
          if (allergen == "TreeNut") {
            allergenList.push("Tree Nut");
          } else {
            allergenList.push(allergen);
          }
        }
      }
    }
    changePreferences(diet, allergenList, height, weight).then((response) => {
      if (response.data.err) {
        setError(true);
        setOpen(true);
      } else if (response) {
        setError(false);
        setOpen(true);
      }
    });
  };

  const {
    Dairy,
    Egg,
    Gluten,
    Grain,
    Peanut,
    Seafood,
    Shellfish,
    Soy,
    TreeNut,
    Wheat,
  } = allergens;

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
              <RadioGroup
                aria-label="diet"
                name="diet"
                value={diet}
                onChange={handleDietChange}
              >
                <FormControlLabel
                  value="Vegan"
                  control={<Radio />}
                  label="Vegan"
                />
                <FormControlLabel
                  value="Vegetarian"
                  control={<Radio />}
                  label="Vegetarian"
                />
                <FormControlLabel
                  value="Paleo"
                  control={<Radio />}
                  label="Paleo"
                />
                <FormControlLabel
                  value="Primal"
                  control={<Radio />}
                  label="Primal"
                />
                <FormControlLabel
                  value="Whole30"
                  control={<Radio />}
                  label="Whole30"
                />
                <FormControlLabel
                  value="Lacto-vegetarian"
                  control={<Radio />}
                  label="Lacto-vegetarian"
                />
                <FormControlLabel
                  value="Ovo-vegetarian"
                  control={<Radio />}
                  label="Ovo-vegetarian"
                />
                <FormControlLabel
                  value="Pescetarian"
                  control={<Radio />}
                  label="Pescetarian"
                />
                <FormControlLabel
                  value="Ketogenic"
                  control={<Radio />}
                  label="Ketogenic"
                />
                <FormControlLabel
                  value="Gluten free"
                  control={<Radio />}
                  label="Gluten free"
                />
              </RadioGroup>
            </Grid>
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography color="textPrimary" gutterBottom variant="h6">
                Allergens
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Dairy}
                    name="Dairy"
                    onChange={handleAllergenChange}
                  />
                }
                label="Dairy"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Egg}
                    name="Egg"
                    onChange={handleAllergenChange}
                  />
                }
                label="Egg"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Gluten}
                    name="Gluten"
                    onChange={handleAllergenChange}
                  />
                }
                label="Gluten"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Grain}
                    name="Grain"
                    onChange={handleAllergenChange}
                  />
                }
                label="Grain"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Peanut}
                    name="Peanut"
                    onChange={handleAllergenChange}
                  />
                }
                label="Peanut"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Seafood}
                    name="Seafood"
                    onChange={handleAllergenChange}
                  />
                }
                label="Seafood"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Shellfish}
                    name="Shellfish"
                    onChange={handleAllergenChange}
                  />
                }
                label="Shellfish"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Soy}
                    name="Soy"
                    onChange={handleAllergenChange}
                  />
                }
                label="Soy"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={TreeNut}
                    name="TreeNut"
                    onChange={handleAllergenChange}
                  />
                }
                label="Tree Nut"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Wheat}
                    name="Wheat"
                    onChange={handleAllergenChange}
                  />
                }
                label="Wheat"
              />
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

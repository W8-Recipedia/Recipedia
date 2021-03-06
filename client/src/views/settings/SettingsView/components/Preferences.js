import {
  Avatar,
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
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import { changePreferences, getUserData } from "src/components/ServerRequests";

import EqualizerOutlinedIcon from "@material-ui/icons/EqualizerOutlined";
import clsx from "clsx";

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
  const [openDialog, setOpenDialog] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [diet, setDiet] = useState("");
  const [allergens, setAllergens] = useState({
    Dairy: false,
    Egg: false,
    Gluten: false,
    Grain: false,
    Peanut: false,
    Seafood: false,
    Sesame: false,
    Shellfish: false,
    Soy: false,
    TreeNut: false,
    Wheat: false,
  });
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState(0);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useLayoutEffect(() => {
    getUserData().then((response) => {
      if (response.data.message === "loggedIn") {
        if (response.data.diet) {
          setDiet(response.data.diet);
        }
        if (response.data.allergens) {
          var allergenJSON = {};
          response.data.allergens.forEach((item) => {
            const allergen = item === "Tree Nut" ? "TreeNut" : item;
            allergenJSON[allergen] = true;
          });
          setAllergens(allergenJSON);
        }

        if (response.data.health) {
          setHeight(response.data.health.height);
          setWeight(response.data.health.weight);
          setActivity(response.data.health.activity);
        }
      }
      setButtonDisabled(true);
    });
  }, []);

  const handleDietChange = (event) => {
    setButtonDisabled(false);
    setDiet(event.target.value);
  };

  const handleAllergenChange = (event) => {
    setButtonDisabled(false);
    setAllergens({ ...allergens, [event.target.name]: event.target.checked });
  };

  const handleSubmit = () => {
    var allergenList = [];
    for (var allergen in allergens) {
      if (allergens[allergen] === true) {
        if (allergen === "TreeNut") {
          allergenList.push("Tree Nut");
        } else {
          allergenList.push(allergen);
        }
      }
    }
    changePreferences(diet, allergenList, height, weight, activity).then(
      (response) => {
        setOpenDialog(true);
        if (response.data.message === "updateSuccess") {
          setUpdateError(false);
        } else if (response) {
          setUpdateError(true);
        }
      }
    );
  };

  const {
    Dairy,
    Egg,
    Gluten,
    Grain,
    Peanut,
    Seafood,
    Sesame,
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
              <RadioGroup name="diet" value={diet} onChange={handleDietChange}>
                <FormControlLabel
                  value="None"
                  control={<Radio />}
                  label="None"
                />
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
                    checked={Sesame}
                    name="Sesame"
                    onChange={handleAllergenChange}
                  />
                }
                label="Sesame"
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
                Health metrics
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Height (cm)"
                    type="number"
                    variant="outlined"
                    onChange={(e) => {
                      setHeight(e.target.value);
                      setButtonDisabled(false);
                    }}
                    value={height}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Weight (kg)"
                    type="number"
                    variant="outlined"
                    onChange={(e) => {
                      setWeight(e.target.value);
                      setButtonDisabled(false);
                    }}
                    value={weight}
                  />{" "}
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
                            {weight === 0 || height === 0 || !weight || !height
                              ? "Undefined"
                              : (parseFloat(weight) * 10.0) /
                                  Math.pow(parseFloat(height) / 100.0, 2) /
                                  10.0 >
                                100
                              ? "100+"
                              : Math.round(
                                  (parseFloat(weight) * 10.0) /
                                    Math.pow(parseFloat(height) / 100.0, 2)
                                ) / 10.0}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Avatar className={classes.avatar}>
                            <EqualizerOutlinedIcon />
                          </Avatar>
                        </Grid>
                      </Grid>
                      <Typography color="textSecondary" variant="caption">
                        {parseFloat(weight) /
                          Math.pow(parseFloat(height) / 100.0, 2) ===
                          0 ||
                        weight === 0 ||
                        height === 0 ||
                        !weight ||
                        !height
                          ? "Please enter your details"
                          : parseFloat(weight) /
                              Math.pow(parseFloat(height) / 100.0, 2) <
                            18.5
                          ? "Underweight"
                          : parseFloat(weight) /
                              Math.pow(parseFloat(height) / 100.0, 2) <
                            25
                          ? " Normal weight"
                          : parseFloat(weight) /
                              Math.pow(parseFloat(height) / 100.0, 2) <
                            30
                          ? " Overweight"
                          : "Obese"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Activity level
                  </Typography>
                  <Typography
                    gutterBottom
                    color="textSecondary"
                    variant="body2"
                  >
                    How many hours do you exercise every week?
                  </Typography>
                  <Box pt={2} pr={1} pl={1}>
                    <Slider
                      value={activity}
                      onChange={(e, value) => {
                        setActivity(value);
                        setButtonDisabled(false);
                      }}
                      valueLabelDisplay="auto"
                      step={0.5}
                      min={0}
                      max={20}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            disabled={buttonDisabled}
          >
            Update
          </Button>
        </Box>
        <Dialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
          }}
        >
          <Box p={1}>
            <DialogContent>
              <DialogContentText>
                <Box alignItems="center" justifyContent="center" display="flex">
                  {updateError
                    ? "Your preferences could not be updated. Please try again later."
                    : "Your preferences have been updated."}{" "}
                </Box>
              </DialogContentText>
            </DialogContent>
          </Box>
        </Dialog>
      </Card>
    </form>
  );
};

export default Preferences;

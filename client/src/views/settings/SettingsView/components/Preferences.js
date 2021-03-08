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
  FormGroup,
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

  const [diets, setDiets] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [health, setHealth] = useState([]);

  useLayoutEffect(() => {}, []);

  const handleDietChange = (dietInput) => {
    diets.includes(dietInput)
      ? setDiets(diets.filter((diet) => diet !== dietInput))
      : diets.push(dietInput);
  };

  const handleAllergenChange = (allergenInput) => {
    allergens.includes(allergenInput)
      ? setDiets(allergens.filter((allergen) => allergen !== allergenInput))
      : allergens.push(allergenInput);
  };
  const handleSubmit = () => {
    console.log(diets);
    console.log(allergens);
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
                      <Typography color="textSecondary" variant="caption">
                        Normal weight
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
      </Card>
    </form>
  );
};

Preferences.propTypes = {
  className: PropTypes.string,
};

export default Preferences;

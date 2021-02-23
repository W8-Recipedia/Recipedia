import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  IconButton,
  TextField,
  Grid,
  InputAdornment,
  Select,
  InputLabel,
  Input,
  Checkbox,
  MenuItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import Axios from "axios";

var API_KEY = process.env.RECIPE_API_KEY;

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const cuisineNames = [
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

const typeNames = [
  "Main course",
  "Side dish",
  "Dessert",
  "Appetizer",
  "Salad",
  "Bread",
  "Breakfast",
  "Soup",
  "Beverage",
  "Sauce",
  "Marinade",
  "Fingerfood",
  "Snack",
  "Drink",
];

const Searchbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [cuisineName, setCuisineName] = React.useState([]);
  const [typeName, setTypeName] = React.useState([]);

  const handleChangeCuisine = (event) => {
    setCuisineName(event.target.value);
  };
  const handleChangeType = (event) => {
    setTypeName(event.target.value);
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={1}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
          <TextField
            variant="outlined"
            name="query"
            placeholder="Search recipes"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          </Grid>
          <Grid item md={3} xs={12}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              multiple
              fullWidth
              value={typeName}
              onChange={handleChangeType}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {typeNames.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={typeName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item md={3} xs={12}>
            <InputLabel id="cuisine-label">Cuisine</InputLabel>
            <Select
              labelId="cuisine-label"
              id="cuisine"
              multiple
              fullWidth
              value={cuisineName}
              onChange={handleChangeCuisine}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {cuisineNames.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={cuisineName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

Searchbar.propTypes = {
  className: PropTypes.string,
};

export default Searchbar;

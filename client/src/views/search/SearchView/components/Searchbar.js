import React, { useState } from "react";
import PropTypes from "prop-types";
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
  Paper
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

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

const initialFormData = Object.freeze({
  query: "",
});

  export default function Searchbar(props) {
  const [formState, setFormState] = useState(initialFormData);
  const [cuisineName, setCuisineName] = React.useState([]);
  const [typeName, setTypeName] = React.useState([]);

  const handleChangeCuisine = (event) => {
    setCuisineName(event.target.value);
  };
  const handleChangeType = (event) => {
    setTypeName(event.target.value);
  };

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(formState.query);
  };

  return (

      <Box mt={1}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <form noValidate autoComplete="off" onSubmit={onSubmit}>
              <TextField
                variant="outlined"
                name="query"
                onChange={handleChange}
                value={formState.query}
                label="Search recipes"
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
            </form>
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
  );
}

Searchbar.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

import React, { useState } from "react";
import PropTypes from "prop-types";
import { IconButton, TextField, Grid, InputAdornment } from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

const initialFormData = Object.freeze({
  query: "",
});

export default function Searchbar(props) {
  const [formState, setFormState] = useState(initialFormData);

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
  );
}

Searchbar.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

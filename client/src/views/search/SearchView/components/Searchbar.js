import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import React, { useState } from "react";

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

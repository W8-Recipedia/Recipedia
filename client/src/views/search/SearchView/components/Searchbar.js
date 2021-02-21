import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Searchbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Box>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon fontSize="small" color="action">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            placeholder="Search recipes"
            variant="outlined"
          />
        </Box>
      </Box>
    </div>
  );
};

Searchbar.propTypes = {
  className: PropTypes.string,
};

export default Searchbar;

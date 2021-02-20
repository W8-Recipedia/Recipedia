import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  makeStyles
} from '@material-ui/core';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Rating from '@material-ui/lab/Rating';



const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, recipes, ...rest }) => {
  const classes = useStyles();
  const [selectedRecipeIds, setSelectedRecipeIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedRecipeIds;

    if (event.target.checked) {
      newSelectedRecipeIds = recipes.map((recipe) => recipe.id);
    } else {
      newSelectedRecipeIds = [];
    }

    setSelectedRecipeIds(newSelectedRecipeIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedRecipeIds.indexOf(id);
    let newSelectedRecipeIds = [];

    if (selectedIndex === -1) {
      newSelectedRecipeIds = newSelectedRecipeIds.concat(selectedRecipeIds, id);
    } else if (selectedIndex === 0) {
      newSelectedRecipeIds = newSelectedRecipeIds.concat(selectedRecipeIds.slice(1));
    } else if (selectedIndex === selectedRecipeIds.length - 1) {
      newSelectedRecipeIds = newSelectedRecipeIds.concat(selectedRecipeIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRecipeIds = newSelectedRecipeIds.concat(
        selectedRecipeIds.slice(0, selectedIndex),
        selectedRecipeIds.slice(selectedIndex + 1)
      );
    }

    setSelectedRecipeIds(newSelectedRecipeIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>

                </TableCell>
                <TableCell>
                  Recipe name
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Cuisine
                </TableCell>
                <TableCell>
                  Type
                </TableCell>
                <TableCell>
                  Rating
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes.slice(0, limit).map((recipe) => (
                <TableRow
                  hover
                  key={recipe.id}
                  selected={selectedRecipeIds.indexOf(recipe.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <IconButton component="span" color="red">
                      <FavoriteBorderIcon
                        style={{ color: 'red' }}
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {recipe.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                      <Rating name="read-only" value={recipe.rating} readOnly />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={recipes.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  recipes: PropTypes.array.isRequired
};

export default Results;

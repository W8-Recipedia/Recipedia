import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Searchbar from './Searchbar';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SearchView = () => {
  const classes = useStyles();
  const [recipes] = useState(data);

  return (
    <Page
      className={classes.root}
      title="Search"
    >
      <Container maxWidth={false}>
        <Searchbar />
        <Box mt={3}>
          <Results recipes={recipes} />
        </Box>
      </Container>
    </Page>
  );
};

export default SearchView;

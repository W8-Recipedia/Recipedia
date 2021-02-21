import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import HomeCard from 'src/views/home/HomeView/components/HomeCard';
import data from 'src/views/home/HomeView/data/data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  homeCard: {
    height: '100%'
  }
}));

const Home = () => {
  const classes = useStyles();
  const [recipes] = useState(data);

  return (
    <Page
      className={classes.root}
      title="Recipedia | Home"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {recipes.map((recipe) => (
              <Grid
                item
                key={recipe.id}
                lg={4}
                md={6}
                xs={12}
              >
                <HomeCard
                  className={classes.homeCard}
                  recipe={recipe}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
        </Box>
      </Container>
    </Page>
  );
};

export default Home;

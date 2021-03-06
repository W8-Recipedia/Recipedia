import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import Page from "src/components/theme/page";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  title: {
    fontSize: 84,
    [theme.breakpoints.up("xs")]: {
      fontSize: 64,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 84,
    },
  },
  buttonText: {
    fontSize: 24,
  },
}));

const LandingView = () => {
  const classes = useStyles();

  return (
    <Scrollbars>
      <Page className={classes.root} title="Recipedia">
        <Box
          display="flex"
          flexDirection="column"
          height="50%"
          justifyContent="center"
        >
          <Container maxWidth="md">
            <Typography align="center" color="textSecondary" variant="h2">
              Eat smarter with
            </Typography>
            <Typography
              align="center"
              color="textPrimary"
              variant="h1"
              className={classes.title}
            >
              Recipedia
            </Typography>
          </Container>
        </Box>
        <Box>
          <Container maxWidth="sm">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Link to="/signup">
                  <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    size="large"
                    className={classes.buttonText}
                  >
                    Sign Up
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link to="/login">
                  <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    size="large"
                    className={classes.buttonText}
                  >
                    Log in
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Page>
    </Scrollbars>
  );
};

export default LandingView;

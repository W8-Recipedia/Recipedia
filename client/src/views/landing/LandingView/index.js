import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  CardMedia,
  // MenuIcon,
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
    fontSize: 64,
    [theme.breakpoints.up("xs")]: {
      fontSize: 64,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 64,
    },
  },
  buttonText: {
    fontSize: 24,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
}));

const LandingView = () => {
  const classes = useStyles();

  return (
    <Scrollbars>
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="primary"
              aria-label="menu"
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography
              variant="h6"
              className={classes.title}
              style={{ flexGrow: 1 }}
            >
              Recipedia
            </Typography>
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
          </Toolbar>
        </AppBar>
      </div>
      <Page className={classes.root} title="Recipedia">
        <Box
          display="flex"
          flexDirection="column"
          height="50%"
          justifyContent="center"
        >
          <Container maxWidth="md">
            <Typography
              align="center"
              color="textPrimary"
              variant="h1"
              className={classes.title}
            >
              Recipedia
            </Typography>
            <Typography align="center" color="textSecondary" variant="h2">
              Revolutionize the way that you find personalised recipes.
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

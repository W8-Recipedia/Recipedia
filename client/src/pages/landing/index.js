import { Avatar, IconButton, Toolbar } from "@material-ui/core";
import { Moon, Sun } from "react-feather";
import { React, useState } from "react";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import BrushIcon from "@material-ui/icons/Brush";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Page from "src/components/theme/page";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import { Link as RouterLink } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import { Scrollbars } from "react-custom-scrollbars";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      overline: {
        fontWeight: 400,
        fontSize: 20,
        paddingLeft: 10,
      },
    },
  })
);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
  },
  topBarTitle: {
    flexGrow: 1,
  },
  heroTitle: {
    fontSize: 84,
    [theme.breakpoints.up("xs")]: {
      fontSize: 64,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 84,
    },
  },
  avatar: {
    height: 100,
    width: 100,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
  },
  buttonText: {
    fontSize: 24,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
}));

const LandingView = ({ toggleDarkMode }) => {
  const classes = useStyles();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Scrollbars>
      <Page className={classes.root} title="Recipedia">
        <AppBar elevation={0}>
          <Toolbar>
            <ThemeProvider theme={theme}>
              <RestaurantIcon />
              <Typography
                variant="overline"
                className={classes.topBarTitle}
                color="inherit"
              >
                Recipedia
              </Typography>
            </ThemeProvider>
            <Box>
              <IconButton
                color="inherit"
                onClick={() => {
                  setDarkMode(!darkMode);
                  toggleDarkMode();
                }}
              >
                {darkMode ? <Sun /> : <Moon />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Box pt={16} pb={10} className={classes.heroContent}>
          <Container maxWidth="sm">
            <Box
              display="flex"
              flexDirection="column"
              height="50%"
              justifyContent="center"
            >
              <Container maxWidth="md">
                <Typography align="center" color="textSecondary" variant="h3">
                  Eat smarter with
                </Typography>
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="h1"
                  className={classes.heroTitle}
                  gutterBottom
                >
                  Recipedia
                </Typography>
              </Container>
            </Box>
            <Box pb={3}>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Recipedia is a revolutionary recipe recommendation site built
                using React and Express.
              </Typography>
            </Box>
            <Grid container spacing={3} justify="center">
              <Grid item xs={12} md={6}>
                <RouterLink to="/signup">
                  <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    size="large"
                    className={classes.buttonText}
                  >
                    Sign Up
                  </Button>
                </RouterLink>
              </Grid>
              <Grid item xs={12} md={6}>
                <RouterLink to="/login">
                  <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    size="large"
                    className={classes.buttonText}
                  >
                    Log in
                  </Button>
                </RouterLink>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box m={10} mt={12} mb={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <Box p={2}>
                  <Box display="flex" justifyContent="center" pb={2}>
                    <Avatar className={classes.avatar}>
                      <EmojiObjectsIcon style={{ fontSize: 50 }} />
                    </Avatar>
                  </Box>
                  <Typography gutterBottom variant="h3" align="center">
                    Smart recommendations
                  </Typography>

                  <Typography align="center">
                    Get personalized recommendations for your health &amp;
                    goals.
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <Box p={2}>
                  <Box display="flex" justifyContent="center" pb={2}>
                    <Avatar className={classes.avatar}>
                      <BrushIcon style={{ fontSize: 50 }} />
                    </Avatar>
                  </Box>
                  <Typography gutterBottom variant="h3" align="center">
                    Easy customization
                  </Typography>
                  <Typography align="center">
                    Specify your allergens, diet, and health data to find the
                    best meals for you!
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <Box p={2}>
                  <Box display="flex" justifyContent="center" pb={2}>
                    <Avatar className={classes.avatar}>
                      <SearchIcon style={{ fontSize: 50 }} />
                    </Avatar>
                  </Box>
                  <Typography gutterBottom variant="h3" align="center">
                    Unbounded search
                  </Typography>

                  <Typography align="center">
                    Filter by cuisines and dish types to find the recipes you
                    really want to eat!
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <Box p={2}>
                  <Box display="flex" justifyContent="center" pb={2}>
                    <Avatar className={classes.avatar}>
                      <SaveIcon style={{ fontSize: 50 }} />
                    </Avatar>
                  </Box>
                  <Typography gutterBottom variant="h3" align="center">
                    Recipe saving
                  </Typography>
                  <Typography align="center">
                    Save your favourite recipes for quick and easy access in the
                    future.
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.footer}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
              Recipedia
            </Link>{" "}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Page>
    </Scrollbars>
  );
};

export default LandingView;

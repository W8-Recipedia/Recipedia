import { Avatar, IconButton, Toolbar } from "@material-ui/core";
import { Moon, Sun } from "react-feather";
import { React, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  makeStyles,
} from "@material-ui/core/styles";

import BrushIcon from "@material-ui/icons/Brush";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";
import Page from "src/components/theme/page";
import { Scrollbars } from "react-custom-scrollbars";

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
  midTitle: {
    fontWeight: 390,
    textAlign: "center",
    paddingTop: "50px",
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
  cardIcons: {
    fontSize: 50,
  },
  cardDescriptions: {
    paddingTop: "12px",
    textAlign: "center",
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
                A revolutionary recipe recommendation site built using React and
                Express.
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
        <Box p={2}>
          <Typography
            color="textSecondary"
            className={classes.midTitle}
            variant="h1"
          >
            Your one-stop destination for recipes.
          </Typography>
        </Box>
        <Box m={10} mt={8} mb={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card raised>
                <Box p={2}>
                  <Box display="flex" justifyContent="center" pb={2}>
                    <Avatar className={classes.avatar}>
                      <EmojiObjectsIcon className={classes.cardIcons} />
                    </Avatar>
                  </Box>
                  <Typography gutterBottom variant="h3" align="center">
                    Smart suggestions
                  </Typography>

                  <Typography className={classes.cardDescriptions}>
                    Get personalized recommendations for your health &amp;
                    goals.
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card raised>
                <Box p={2}>
                  <Box display="flex" justifyContent="center" pb={2}>
                    <Avatar className={classes.avatar}>
                      <BrushIcon className={classes.cardIcons} />
                    </Avatar>
                  </Box>
                  <Typography gutterBottom variant="h3" align="center">
                    Effortless customization
                  </Typography>
                  <Typography className={classes.cardDescriptions}>
                    Specify your allergens, diet, and health data to find the
                    best meals for you!
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card raised>
                <Box p={2}>
                  <Box display="flex" justifyContent="center" pb={2}>
                    <Avatar className={classes.avatar}>
                      <SearchIcon className={classes.cardIcons} />
                    </Avatar>
                  </Box>
                  <Typography gutterBottom variant="h3" align="center">
                    Boundless search
                  </Typography>
                  <Typography className={classes.cardDescriptions}>
                    Filter by cuisines and dish types to find the recipes you
                    really want to eat!
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card raised>
                <Box p={2}>
                  <Box display="flex" justifyContent="center" pb={2}>
                    <Avatar className={classes.avatar}>
                      <FavoriteIcon className={classes.cardIcons} />
                    </Avatar>
                  </Box>
                  <Typography gutterBottom variant="h3" align="center">
                    Favourite recipes
                  </Typography>
                  <Typography className={classes.cardDescriptions}>
                    Save the recipes you can't get enough of for easy access any
                    time and anywhere.
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.footer}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            Recipedia {new Date().getFullYear()}
          </Typography>
        </Box>
      </Page>
    </Scrollbars>
  );
};

export default LandingView;

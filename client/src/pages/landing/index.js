import { React, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Page from "src/components/theme/page";
import { Scrollbars } from "react-custom-scrollbars";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { Toolbar, IconButton, Avatar } from "@material-ui/core";
import { Moon, Sun } from "react-feather";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import BrushIcon from "@material-ui/icons/Brush";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Recipedia
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

let theme = createMuiTheme({
  typography: {
    overline: {
      fontWeight: 400,
      fontSize: 20,
      paddingLeft: 10,
    },
  },
});
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
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
  topBarTitle: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
  avatar: {
    width: 60,
    height: 60,
  },
  buttonText: {
    fontSize: 24,
  },
}));

export default function LandingView({ toggleDarkMode }) {
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
                  className={classes.title}
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
        <Container className={classes.cardGrid}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.card}>
                <Avatar>
                  <BrushIcon />
                </Avatar>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h2" component="h2">
                    Easy customization
                  </Typography>
                  {/* <Typography>
                    You can (optionally) specify your allergens, any diet you
                    follow, and even calculate your TDEE and BMI to find the
                    optimal number of calories to consume at each meal!
                  </Typography> */}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h2" component="h2">
                    Unbounded search
                  </Typography>
                  <Typography>
                    Within search, you can specify cuisines and dish types, to
                    find the recipes you really want to eat! All of the search
                    results are guaranteed to adhere to the dietary
                    restrictions/allergens you have, given that you specify them
                    in the settings page.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h2" component="h2">
                    Recipe saving
                  </Typography>
                  <Typography>
                    With the favourites functionality, users are able to save
                    their tastiest recipes found, for quick and easy access in
                    the future. You can favourite as many recipes as you like,
                    and the more recipes you favourite, the higher you level up
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h2" component="h2">
                    Smart recommendations
                  </Typography>
                  <Typography>
                    Recipedia uses a propriety algorithm to find and recommend
                    the best recipes for you and your fitness goals, based on
                    all the (optional) data given to us directly by you.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Box className={classes.footer}>
          <Copyright />
        </Box>
      </Page>
    </Scrollbars>
  );
}

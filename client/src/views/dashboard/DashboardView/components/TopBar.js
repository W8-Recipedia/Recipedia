import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { LogOut, Moon, Sun, User } from "react-feather";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import { logOut } from "src/components/ServerRequests";

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

const useStyles = makeStyles(() => ({
  avatar: {
    width: 60,
    height: 60,
  },
  title: {
    flexGrow: 1,
  },
}));

const TopBar = ({ className, onMobileNavOpen, toggleDarkMode, ...rest }) => {
  const classes = useStyles();
  const [darkMode, setDarkMode] = React.useState(false);
  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <ThemeProvider theme={theme}>
          <Hidden only={["xs", "sm", "md"]}>
            <RestaurantIcon />
          </Hidden>
          <Typography
            variant="overline"
            className={classes.title}
            color="inherit"
            component={Link}
            to={"/app/home"}
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
          <IconButton color="inherit" component={Link} to={"/app/settings"}>
            <User />
          </IconButton>
          <IconButton color="inherit" onClick={logOut} href="/">
            <LogOut />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

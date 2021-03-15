import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import AccountCircle from "@material-ui/icons/AccountCircle";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { Link } from "react-router-dom";
import { LogOut as LogoutIcon } from "react-feather";
import MenuIcon from "@material-ui/icons/Menu";
import { logOut } from "src/components/ServerRequests";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles(() => ({
  avatar: {
    width: 60,
    height: 60,
  },
  title: {
    flexGrow: 4,
  },
}));

const TopBar = ({ className, onMobileNavOpen, toggleDarkMode, ...rest }) => {
  const classes = useStyles();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <ThemeProvider theme={theme}>
          <Typography
            variant="h6"
            className={classes.title}
            color="inherit"
            component={Link}
            to={"/app/home"}
          >
            Recipedia
          </Typography>
        </ThemeProvider>
        <IconButton color="inherit" onClick={toggleDarkMode}>
          <Brightness4Icon />
        </IconButton>
        <IconButton color="inherit" component={Link} to={"/app/settings"}>
          <AccountCircle />
        </IconButton>
        <IconButton color="inherit" onClick={logOut} href="/">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

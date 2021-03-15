import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { LogOut as LogoutIcon } from "react-feather";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
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

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

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

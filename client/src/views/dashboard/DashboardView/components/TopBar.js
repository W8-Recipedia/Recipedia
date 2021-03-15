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
import clsx from "clsx";
import { logOut } from "src/components/ServerRequests";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
  title: {
    flexGrow: 4,
    color: "#FFF",
  },
  topBarBtn: {
    color: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <ThemeProvider theme={theme}>
          <Typography
            variant="h5"
            className={classes.title}
            component={Link}
            to={"/app/home"}
          >
            Recipedia
          </Typography>
        </ThemeProvider>
        <IconButton
          color="inherit"
          className={classes.topBarBtn}
          component={Link}
          to={"/app/settings"}
        >
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

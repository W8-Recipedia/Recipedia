import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { GitHub, User, Coffee } from "react-feather";
import MenuIcon from "@material-ui/icons/Menu";
import { LogOut as LogoutIcon } from "react-feather";
import { logOut } from "src/components/auth/UserAuth";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";

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
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
  title: {
    flexGrow: 1,
    color: "#FFF",
  },
  topBarBtn: {
    color: "#FFF",
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
          <Coffee />
          <Typography
            variant="overline"
            className={classes.title}
            component={Link}
            to={"/app/home"}
          >
            Recipedia
          </Typography>
        </ThemeProvider>
        <Box>
          <IconButton
            color="inherit"
            className={classes.topBarBtn}
            onClick={() =>
              window.open("https://github.com/W8-Recipedia/Recipedia")
            }
          >
            <GitHub />
          </IconButton>
          <IconButton
            color="inherit"
            className={classes.topBarBtn}
            component={Link}
            to={"/app/settings"}
          >
            <User />
          </IconButton>
          <IconButton color="inherit" onClick={logOut} href="/">
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

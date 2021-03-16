import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Link,
  IconButton,
  Toolbar,
  Collapse,
  Typography,
} from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as Scroll } from "react-scroll";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    // fontFamily: "Nunito",
  },
  appbar: {},
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  appbarTitle: {
    flexGrow: "1",
  },
  icon: {
    color: "#fff",
    fontSize: "2rem",
  },
  // colorText: {
  //   color: "#3f51b5",
  // },
  container: {
    textAlign: "center",
  },
  // title: {
  //   color: "#fff",
  //   fontSize: "4.5rem",
  // },
  title: {
    fontSize: 84,
    [theme.breakpoints.up("xs")]: {
      fontSize: 64,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 84,
    },
  },
  goDown: {
    color: "#3f51b5",
    fontSize: "4rem",
  },
}));
export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            <span className={classes.colorText}>Recipedia.</span>
          </h1>
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

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          {/* <h1 className={classes.title}>
            <span className={classes.colorText}>Welcome to</span>
            <br />
            <span className={classes.colorText}>Recipedia.</span>
          </h1> */}
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
          <Scroll to="site-functionality" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}

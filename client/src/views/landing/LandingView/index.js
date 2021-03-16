import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Hidden,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import Page from "src/components/theme/page";
import { Scrollbars } from "react-custom-scrollbars";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  page2: {
    backgroundColor: "black",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
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
  buttonText: {
    fontSize: 24,
  },
  downArrow: {
    fontSize: "4rem",
  },
  image: {
    width: "100%",
  },
}));

const LandingView = () => {
  const cardRef = useRef(null);

  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <Scrollbars>
      <Page className={classes.root} title="Recipedia">
        <Box
          display="flex"
          flexDirection="column"
          height="50%"
          justifyContent="center"
        >
          <Container maxWidth="md">
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
                <Grid item xs={12} md={12}>
                  <Box display="flex" justifyContent="center">
                    <IconButton>
                      <ExpandMoreIcon
                        className={classes.downArrow}
                        onClick={() =>
                          cardRef.current.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          })
                        }
                      />
                    </IconButton>
                  </Box>
                </Grid>
            </Grid>
          </Container>
        </Box>
      </Page>
        <Page ref={cardRef} className={classes.page2}>
          <Box>
            <Grid container>
              <Grid item md={6} xs={12}>
                <Box m={10}>
                  <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h2">
                        Favourites
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        With the Favorite functionality users will be able to
                        save recipies that they discovered using Recipedia and
                        wish to keep them saved to be quickly retrieved
                      </Typography>
                    </CardContent>
                    <img
                      className={classes.image}
                      src="https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80"
                    />
                  </Card>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box m={10}>
                  <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h2">
                        Search
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Within the Recipedia search functionality one can
                        specify their dietary requirements by selecting from an
                        extensive list of options that include but are not
                        limited to.
                      </Typography>
                    </CardContent>
                    <img
                      className={classes.image}
                      src="https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80"
                    />
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Page>
    </Scrollbars>
  );
};

export default LandingView;

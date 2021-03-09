import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "src/components/theme/page";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560,
  },
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <Scrollbars>
      <Page className={classes.root} title="Recipedia | Page Not Found">
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="md">
            <Typography align="center" color="textPrimary" variant="h1">
              Oops! We couldn't find that page.
            </Typography>
            <Box textAlign="center">
              <img
                alt="Not found"
                className={classes.image}
                src="/static/images/errorimage.svg"
              />
            </Box>
          </Container>
          <Box textAlign="center" pt={6}>
            <Link to="/app/home">
              <Button color="primary" variant="contained" size="large">
                Go home
              </Button>
            </Link>
          </Box>
        </Box>
      </Page>
    </Scrollbars>
  );
};

export default NotFoundView;

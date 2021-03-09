import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  makeStyles,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  TextField,
} from "@material-ui/core";
import Page from "src/components/theme/page";
import { Scrollbars } from "react-custom-scrollbars";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const FeedbackView = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    feedback: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Scrollbars>
      <Page className={classes.root} title="Recipedia | Feedback">
        <Container maxWidth="xl">
          <Card variant="outlined">
            <CardContent>
              <Box p={1}>
                <Typography gutterBottom variant="h1">
                  Feedback
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  We would love to hear your thoughts on Recipedia! Feel free to
                  fill out this form and help us improve the app.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
        <Container maxWidth="xl">
          <form
            autoComplete="off"
            noValidate
            className={clsx(classes.root, className)}
            {...rest}
          >
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="First name"
                      name="firstName"
                      onChange={handleChange}
                      required
                      value={values.firstName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Last name"
                      name="lastName"
                      onChange={handleChange}
                      required
                      value={values.lastName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Email address"
                      name="email"
                      onChange={handleChange}
                      required
                      value={values.email}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Phone number"
                      name="phone"
                      onChange={handleChange}
                      required
                      value={values.phone}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Feedback"
                      name="feedback"
                      onChange={handleChange}
                      required
                      multiline
                      rows={8}
                      value={values.feedback}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Button color="primary" variant="contained">
                  Send
                </Button>
              </Box>
            </Card>
          </form>
        </Container>
      </Page>
    </Scrollbars>
  );
};

FeedbackView.propTypes = {
  className: PropTypes.string,
};

export default FeedbackView;

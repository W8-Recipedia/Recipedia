import React, { useState, useLayoutEffect } from "react";
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
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
  Divider,
  TextField,
} from "@material-ui/core";
import Page from "src/components/theme/page";
import { Scrollbars } from "react-custom-scrollbars";
import { getUserInfo, submitFeeback } from "src/components/auth/UserAuth";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [feedbackError, setFeedbackError] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState("");
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    feedback: "",
  });
  useLayoutEffect(() => {
    getUserInfo().then((authResponse) => {
      if (authResponse.data.loggedIn) {
        setValues({
          firstName: authResponse.data.user.firstname,
          lastName: authResponse.data.user.lastname,
          email: authResponse.data.user.email,
        });
      }
    });
    setButtonDisabled(true);
  }, []);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    if (values.feedback.length < 150) {
      setFeedbackError(true);
    } else {
      submitFeeback(values.feedback).then((authResponse) => {
        console.log(authResponse.data.message);
        setFeedbackStatus(authResponse.data.message);
        setOpen(true);
      });
    }
  };

  return (
    <Scrollbars>
      <Page className={classes.root} title="Recipedia | Feedback">
        <Container maxWidth="xl">
          <Card variant="outlined">
            <CardContent>
              <Box p={1}>
                <Typography gutterBottom variant="h1">
                  Contact us.
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
                      required
                      disabled
                      value={values.firstName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Last name"
                      name="lastName"
                      required
                      disabled
                      value={values.lastName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Email address"
                      name="email"
                      required
                      disabled
                      value={values.email}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      helperText={
                        feedbackError
                          ? "Please enter at least 150 characters."
                          : null
                      }
                      fullWidth
                      label="Feedback"
                      name="feedback"
                      onChange={(e) => {
                        handleChange(e);
                        setButtonDisabled(false);
                        setFeedbackError(false);
                      }}
                      required
                      multiline
                      rows={8}
                      error={feedbackError}
                      value={values.feedback}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={buttonDisabled}
                  onClick={handleSubmit}
                >
                  Send
                </Button>
              </Box>
            </Card>
          </form>
        </Container>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={() => {
            navigate("/app/home");
          }}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {feedbackStatus === "Success"
                ? "Thank you for your feedback!"
                : "There was an error submitting your feedback. Please try again later."}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Page>
    </Scrollbars>
  );
};

FeedbackView.propTypes = {
  className: PropTypes.string,
};

export default FeedbackView;

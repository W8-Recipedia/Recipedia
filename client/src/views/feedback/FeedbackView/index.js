import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import { getUserData, submitFeeback } from "src/components/ServerRequests";

import Page from "src/components/theme/page";
import { Scrollbars } from "react-custom-scrollbars";
import clsx from "clsx";
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
    getUserData().then((response) => {
      if (response.data.message === "loggedIn") {
        setValues({
          firstName: response.data.user.firstname,
          lastName: response.data.user.lastname,
          email: response.data.user.email,
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
      submitFeeback(values.feedback).then((response) => {
        setFeedbackStatus(response.data.message);
        setOpen(true);
      });
    }
  };

  return (
    <Scrollbars>
      <Page className={classes.root} title="Feedback | Recipedia">
        <Box m={2}>
          <Container maxWidth="false">
            <Card>
              <CardContent>
                <Box p={1}>
                  <Typography gutterBottom variant="h1">
                    Contact us.
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    We would love to hear your thoughts on Recipedia! Feel free
                    to fill out this form and help us improve the app.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Container>
          <Container maxWidth="false">
            <Box mt={3}>
              <Card>
                <form autoComplete="off" noValidate {...rest}>
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
                </form>
              </Card>
            </Box>
          </Container>
          <Dialog
            open={open}
            onClose={() => {
              navigate("/app/home");
            }}
          >
            <DialogContent>
              <DialogContentText>
                {feedbackStatus === "feedbackSent"
                  ? "Thank you for your feedback!"
                  : "There was an error submitting your feedback. Please try again later."}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Box>
      </Page>
    </Scrollbars>
  );
};

export default FeedbackView;

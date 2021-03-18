import * as Yup from "yup";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  resendVerificationEmail,
  verifyEmail,
} from "src/components/ServerRequests";

import { Link } from "react-router-dom";
import Page from "src/components/theme/page";
import { Scrollbars } from "react-custom-scrollbars";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const VerifyView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [verificationStatus, setVerificationStatus] = useState();
  const [emailStatus, setEmailStatus] = useState();

  const resendVerification = (values) => {
    resendVerificationEmail(values.email).then((response) => {
      setEmailStatus(response.data.message);
    });
  };

  useLayoutEffect(() => {
    if (window.location.pathname !== "/verify") {
      verifyEmail(window.location.pathname.replace("/verify/", "")).then(
        (response) => {
          setVerificationStatus(response.data.message);
        }
      );
    } else {
      setVerificationStatus("noToken");
    }
  }, []);

  useEffect(() => {
    navigate(`/verify`);
  }, []);

  return (
    <Scrollbars>
      <Page className={classes.root} title="Verify Email | Recipedia">
        <Dialog open={verificationStatus}>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
            })}
            onSubmit={resendVerification}
          >
            {({ errors, handleBlur, handleChange, touched, values }) => (
              <Form>
                <Box p={1}>
                  <DialogContent>
                    <DialogContentText>
                      <Box
                        alignItems="center"
                        justifyContent="center"
                        display="flex"
                      >
                        {verificationStatus === "userVerified"
                          ? "Your email has been verified!"
                          : verificationStatus === "noToken"
                          ? "Please enter your email to send a new verification email."
                          : "Your email could not be verified. Please enter your email to send a new verification email."}
                      </Box>
                      <Box
                        alignItems="center"
                        justifyContent="center"
                        display="flex"
                      >
                        {verificationStatus !== "userVerified" ? (
                          <TextField
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                            helperText={touched.email && errors.email}
                            label="Email address"
                            margin="normal"
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="email"
                            value={values.email}
                            variant="outlined"
                          />
                        ) : null}
                      </Box>
                    </DialogContentText>
                  </DialogContent>
                  <Box
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                    pb={2}
                  >
                    {verificationStatus === "userVerified" ? (
                      <Button
                        component={Link}
                        to={"/login"}
                        color="primary"
                        variant="contained"
                      >
                        Log in
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        type="submit"
                      >
                        Verify
                      </Button>
                    )}
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Dialog>

        <Dialog open={emailStatus}>
          <Box p={1}>
            <DialogContent>
              <DialogContentText>
                <Box alignItems="center" justifyContent="center" display="flex">
                  {emailStatus === "accountAlreadyVerified"
                    ? "Your email is already verified. Please log in to your account!"
                    : emailStatus === "noAccount"
                    ? "Please sign up first!"
                    : emailStatus === "emailSuccess"
                    ? "A verification email has been sent to your email adress. You can now close this tab."
                    : "Unkown error."}
                </Box>
              </DialogContentText>
            </DialogContent>
            {emailStatus === "accountAlreadyVerified" ||
            emailStatus === "noAccount" ? (
              <Box
                alignItems="center"
                justifyContent="center"
                display="flex"
                pb={2}
              >
                {emailStatus === "noAccount" ? (
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/signup"
                  >
                    Sign Up
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/login"
                  >
                    Log in
                  </Button>
                )}
              </Box>
            ) : null}
          </Box>
        </Dialog>
      </Page>
    </Scrollbars>
  );
};

export default VerifyView;

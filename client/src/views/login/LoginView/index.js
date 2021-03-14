import * as Yup from "yup";

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { googleLogin, login } from "src/components/auth/UserAuth";

import GoogleLogin from "react-google-login";
import Page from "src/components/theme/page";
import { Scrollbars } from "react-custom-scrollbars";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  signupbutton: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    paddingBottom: theme.spacing(3),
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [verifyError, setVerifyError] = useState(false);
  const [googleAccount, setGoogleAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const responseGoogle = (response) => {
    googleLogin(response.profileObj).then((response) => {
      if (response.data.message === "loggedIn") {
        navigate("/app/home");
      } else if (response.data.message === "wrongAccountType") {
        setLoginError(response.data.message);
      } else if (response.data.message === "accountNotVerified") {
        setVerifyError(true);
      } else {
        setOpen(true);
      }
    });
  };

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    login(values.email, values.password).then((response) => {
      if (response.data.message === "loggedIn") {
        navigate("/app/home");
      } else {
        if (response.data.message === "wrongAccountType") {
          setGoogleAccount(true);
        } else if (response.data.message === "accountNotVerified") {
          setVerifyError(true);
        } else {
          setLoginError(response.data.message);
        }
      }
    });
  };

  return (
    <Scrollbars>
      <Page className={classes.root} title="Recipedia | Log in">
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
                password: Yup.string()
                  .max(255)
                  .required("Password is required"),
              })}
              onSubmit={handleSubmit}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                isSubmitting,
                touched,
                values,
              }) => (
                <Form>
                  <Box mb={3}>
                    <Typography color="textPrimary" variant="h2">
                      Log in
                    </Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <GoogleLogin
                        clientId="265952619085-t28mi10gaiq8i88615gkf095289ulddj.apps.googleusercontent.com"
                        buttonText="Log in with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        render={(renderProps) => (
                          <Button
                            fullWidth
                            startIcon={
                              <SvgIcon>
                                <path d="M21,12.2177419 C21,13.9112905 20.6311475,15.4233869 19.8934426,16.7540323 C19.1557377,18.0846776 18.1168031,19.1249998 16.7766393,19.875 C15.4364756,20.6250002 13.8934424,21 12.147541,21 C10.4999998,21 8.97540984,20.5947579 7.57377049,19.7842742 C6.17213115,18.9737905 5.05942604,17.8790323 4.23565574,16.5 C3.41188543,15.1209677 3,13.6209679 3,12 C3,10.3790321 3.41188543,8.87903226 4.23565574,7.5 C5.05942604,6.12096774 6.17213115,5.02620949 7.57377049,4.21572581 C8.97540984,3.40524212 10.4999998,3 12.147541,3 C14.5327871,3 16.5737705,3.78629051 18.2704918,5.35887097 L15.7991803,7.71774194 C15.0122953,6.96774175 14.0655738,6.52016129 12.9590164,6.375 C11.9262295,6.22983871 10.9057375,6.375 9.89754098,6.81048387 C8.88934445,7.24596774 8.07786904,7.89919355 7.46311475,8.77016129 C6.79918033,9.71370968 6.46721311,10.7903228 6.46721311,12 C6.46721311,13.0403228 6.72540984,13.9899192 7.24180328,14.8487903 C7.75819672,15.7076615 8.4467215,16.3971776 9.30737705,16.9173387 C10.1680326,17.4374998 11.1147541,17.6975806 12.147541,17.6975806 C13.2540984,17.6975806 14.2254096,17.455645 15.0614754,16.9717742 C15.7254098,16.5846772 16.2786885,16.0645161 16.7213115,15.4112903 C17.0409838,14.8790321 17.2499998,14.3467744 17.3483607,13.8145161 L12.147541,13.8145161 L12.147541,10.6935484 L20.852459,10.6935484 C20.9508199,11.2258066 21,11.7338712 21,12.2177419 Z" />
                              </SvgIcon>
                            }
                            size="large"
                            variant="contained"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                          >
                            Log in with Google
                          </Button>
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Box mt={3} mb={1}>
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      or log in with your email address
                    </Typography>
                  </Box>
                  <TextField
                    error={
                      loginError === "noAccount" ||
                      loginError === "wrongPassword"
                        ? Boolean(true)
                        : Boolean(touched.password && errors.password)
                    }
                    fullWidth
                    helperText={
                      loginError === "noAccount"
                        ? "Please sign up before logging in!"
                        : touched.email && errors.email
                    }
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={
                      loginError === "wrongPassword"
                        ? Boolean(true)
                        : Boolean(touched.password && errors.password)
                    }
                    fullWidth
                    helperText={
                      loginError === "wrongPassword"
                        ? "Incorrect email and/or password"
                        : touched.password && errors.password
                    }
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Log in
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1">
                    Don&apos;t have an account?{" "}
                    <Link component={RouterLink} to="/signup" variant="h6">
                      Sign up
                    </Link>
                  </Typography>
                </Form>
              )}
            </Formik>
            <Dialog
              open={googleAccount}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              onClose={() => {
                setGoogleAccount(false);
              }}
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Please log in with your Google account!
                </DialogContentText>
              </DialogContent>
              <DialogActions className={classes.signupbutton}>
                <GoogleLogin
                  clientId="265952619085-t28mi10gaiq8i88615gkf095289ulddj.apps.googleusercontent.com"
                  buttonText="Log in with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  render={(renderProps) => (
                    <Button
                      fullWidth
                      startIcon={
                        <SvgIcon>
                          <path d="M21,12.2177419 C21,13.9112905 20.6311475,15.4233869 19.8934426,16.7540323 C19.1557377,18.0846776 18.1168031,19.1249998 16.7766393,19.875 C15.4364756,20.6250002 13.8934424,21 12.147541,21 C10.4999998,21 8.97540984,20.5947579 7.57377049,19.7842742 C6.17213115,18.9737905 5.05942604,17.8790323 4.23565574,16.5 C3.41188543,15.1209677 3,13.6209679 3,12 C3,10.3790321 3.41188543,8.87903226 4.23565574,7.5 C5.05942604,6.12096774 6.17213115,5.02620949 7.57377049,4.21572581 C8.97540984,3.40524212 10.4999998,3 12.147541,3 C14.5327871,3 16.5737705,3.78629051 18.2704918,5.35887097 L15.7991803,7.71774194 C15.0122953,6.96774175 14.0655738,6.52016129 12.9590164,6.375 C11.9262295,6.22983871 10.9057375,6.375 9.89754098,6.81048387 C8.88934445,7.24596774 8.07786904,7.89919355 7.46311475,8.77016129 C6.79918033,9.71370968 6.46721311,10.7903228 6.46721311,12 C6.46721311,13.0403228 6.72540984,13.9899192 7.24180328,14.8487903 C7.75819672,15.7076615 8.4467215,16.3971776 9.30737705,16.9173387 C10.1680326,17.4374998 11.1147541,17.6975806 12.147541,17.6975806 C13.2540984,17.6975806 14.2254096,17.455645 15.0614754,16.9717742 C15.7254098,16.5846772 16.2786885,16.0645161 16.7213115,15.4112903 C17.0409838,14.8790321 17.2499998,14.3467744 17.3483607,13.8145161 L12.147541,13.8145161 L12.147541,10.6935484 L20.852459,10.6935484 C20.9508199,11.2258066 21,11.7338712 21,12.2177419 Z" />
                        </SvgIcon>
                      }
                      size="large"
                      variant="contained"
                      onClick={renderProps.onClick}
                    >
                      Log in with Google
                    </Button>
                  )}
                />
              </DialogActions>
            </Dialog>
            <Dialog
              open={open}
              onClose={() => {
                setOpen(false);
              }}
            >
              <DialogContent>
                <DialogContentText>
                  You must sign up with Google before logging in!
                </DialogContentText>
              </DialogContent>
              <DialogActions className={classes.signupbutton}>
                <Button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  color="primary"
                  variant="contained"
                >
                  Sign up
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={verifyError}
              onClose={() => {
                setVerifyError(false);
              }}
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Please verify your email before logging in!
                </DialogContentText>
              </DialogContent>
            </Dialog>
            <Dialog
              open={Boolean(loginError === "wrongAccountType")}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              onClose={() => {
                setLoginError("");
              }}
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Please login with your email and password!
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </Container>
        </Box>
      </Page>
    </Scrollbars>
  );
};

export default LoginView;

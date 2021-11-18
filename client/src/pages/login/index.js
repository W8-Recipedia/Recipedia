import * as Yup from "yup";

import {
  Box,
  Button,
  Container,
  Dialog,
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
import { googleLogin, login } from "src/components/ServerRequests";

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
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = (response) => {
    googleLogin(response.profileObj).then((response) => {
      if (response.data.message === "loggedIn") {
        navigate("/app/home");
      } else {
        setLoginStatus(response.data.message);
      }
    });
  };

  const handleLogin = (values) => {
    login(values.email, values.password).then((response) => {
      if (response.data.message === "loggedIn") {
        navigate("/app/home");
      } else {
        setLoginStatus(response.data.message);
      }
    });
  };

  return (
    <Scrollbars>
      <Page className={classes.root} title="Log in | Recipedia">
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                email: "demo1@example.com",
                password: "DemoAccount!123",
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
              onSubmit={handleLogin}
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
                        clientId="26004639001-sv0fv7st0emr0mi17n8jlgd6sipafam6.apps.googleusercontent.com"
                        buttonText="Log in with Google"
                        onSuccess={handleGoogleLogin}
                        onFailure={handleGoogleLogin}
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
                      loginStatus === "noAccount" ||
                      loginStatus === "wrongPassword"
                        ? Boolean(true)
                        : Boolean(touched.password && errors.password)
                    }
                    fullWidth
                    helperText={
                      loginStatus === "noAccount"
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
                      loginStatus === "wrongPassword"
                        ? Boolean(true)
                        : Boolean(touched.password && errors.password)
                    }
                    fullWidth
                    helperText={
                      loginStatus === "wrongPassword"
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
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
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
          </Container>
        </Box>
        {loginStatus ? (
          <Dialog
            open={loginStatus !== "noAccount" && loginStatus}
            onClose={() => {
              setLoginStatus();
            }}
          >
            <Box p={1}>
              <DialogContent>
                <DialogContentText>
                  <Box
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                  >
                    {loginStatus === "wrongAccountTypeNotGoogle"
                      ? "Please log in with your email and password!"
                      : loginStatus === "wrongAccountTypeGoogle"
                      ? "Please log in with your Google account!"
                      : loginStatus === "accountNotVerified"
                      ? "Please verify your email before logging in!"
                      : "Unknown error."}
                  </Box>
                </DialogContentText>
              </DialogContent>
              {loginStatus === "accountNotVerified" ||
              loginStatus === "noAccount" ? (
                <Box
                  alignItems="center"
                  justifyContent="center"
                  display="flex"
                  pb={2}
                >
                  {loginStatus === "noAccount" ? (
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      component={RouterLink}
                      to="/signup"
                    >
                      Sign Up
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        navigate("/verify");
                      }}
                      color="primary"
                      variant="contained"
                    >
                      Verify
                    </Button>
                  )}
                </Box>
              ) : null}
            </Box>
          </Dialog>
        ) : null}
      </Page>
    </Scrollbars>
  );
};

export default LoginView;

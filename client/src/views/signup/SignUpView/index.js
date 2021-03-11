import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { signUp, googleSignUp } from "src/components/auth/UserAuth";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  InputAdornment,
  Typography,
  makeStyles,
  SvgIcon,
} from "@material-ui/core";
import Page from "src/components/theme/page";
import GoogleLogin from "react-google-login";
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
  loginbutton: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    paddingBottom: theme.spacing(3),
  },
}));

const SignUpView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [googleSignUpOpen, setGoogleSignUpOpen] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    signUp(
      values.firstName,
      values.lastName,
      values.email,
      values.password
    ).then((authResponse) => {
      if (authResponse === "Success") {
        navigate("/app/home");
      } else {
        setOpen(true);
      }
    });
  };

  const responseGoogle = (response) => {
    setGoogleSignUpOpen(true);
  };

  const handleGoogleSubmit = (response) => {
    googleSignUp(response.tokenId, response.profileObj).then((authResponse) => {
      if (authResponse === "Success") {
        navigate("/app/home");
      } else {
        setGoogleSignUpOpen(false);
        setOpen(true);
      }
    });
  };

  return (
    <Scrollbars>
      <Page className={classes.root} title="Recipedia | Sign Up">
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
                firstName: "",
                lastName: "",
                password: "",
                policy: false,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
                firstName: Yup.string()
                  .max(255)
                  .required("First name is required"),
                lastName: Yup.string()
                  .max(255)
                  .required("Last name is required"),
                password: Yup.string()
                  .max(255)
                  .required("Password is required")
                  .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                    "Password must contain an uppercase letter, a number, and a symbol"
                  )
                  .min(8, "Password must be at least 8 characters"),
                confirmPassword: Yup.string().oneOf(
                  [Yup.ref("password"), null],
                  "Passwords must match"
                ),
                policy: Yup.boolean().oneOf(
                  [true],
                  "Please accept the Terms and Conditions"
                ),
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
                      Create a new account
                    </Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        startIcon={
                          <SvgIcon>
                            <path d="M21,12.2177419 C21,13.9112905 20.6311475,15.4233869 19.8934426,16.7540323 C19.1557377,18.0846776 18.1168031,19.1249998 16.7766393,19.875 C15.4364756,20.6250002 13.8934424,21 12.147541,21 C10.4999998,21 8.97540984,20.5947579 7.57377049,19.7842742 C6.17213115,18.9737905 5.05942604,17.8790323 4.23565574,16.5 C3.41188543,15.1209677 3,13.6209679 3,12 C3,10.3790321 3.41188543,8.87903226 4.23565574,7.5 C5.05942604,6.12096774 6.17213115,5.02620949 7.57377049,4.21572581 C8.97540984,3.40524212 10.4999998,3 12.147541,3 C14.5327871,3 16.5737705,3.78629051 18.2704918,5.35887097 L15.7991803,7.71774194 C15.0122953,6.96774175 14.0655738,6.52016129 12.9590164,6.375 C11.9262295,6.22983871 10.9057375,6.375 9.89754098,6.81048387 C8.88934445,7.24596774 8.07786904,7.89919355 7.46311475,8.77016129 C6.79918033,9.71370968 6.46721311,10.7903228 6.46721311,12 C6.46721311,13.0403228 6.72540984,13.9899192 7.24180328,14.8487903 C7.75819672,15.7076615 8.4467215,16.3971776 9.30737705,16.9173387 C10.1680326,17.4374998 11.1147541,17.6975806 12.147541,17.6975806 C13.2540984,17.6975806 14.2254096,17.455645 15.0614754,16.9717742 C15.7254098,16.5846772 16.2786885,16.0645161 16.7213115,15.4112903 C17.0409838,14.8790321 17.2499998,14.3467744 17.3483607,13.8145161 L12.147541,13.8145161 L12.147541,10.6935484 L20.852459,10.6935484 C20.9508199,11.2258066 21,11.7338712 21,12.2177419 Z" />
                          </SvgIcon>
                        }
                        size="large"
                        variant="contained"
                        onClick={responseGoogle}
                      >
                        Sign up with Google
                      </Button>
                    </Grid>
                  </Grid>
                  <Box mt={3} mb={1}>
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      or sign up with your email address
                    </Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        label="First name"
                        margin="normal"
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        label="Last name"
                        margin="normal"
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
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
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={
                      initialRender
                        ? "Use 8 or more characters with a mix of letters, numbers & symbols"
                        : touched.password && errors.password
                    }
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      setInitialRender(false);
                    }}
                    value={values.password}
                    variant="outlined"
                    type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    fullWidth
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    label="Confirm password"
                    margin="normal"
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      setInitialRender(false);
                    }}
                    type="password"
                    value={values.confirmPassword}
                    variant="outlined"
                  />
                  <Box alignItems="center" display="flex" ml={-1}>
                    <Checkbox
                      checked={values.policy}
                      name="policy"
                      onChange={handleChange}
                    />
                    <Typography color="textSecondary" variant="body1">
                      I have read the{" "}
                      <Link
                        color="primary"
                        component={RouterLink}
                        to="/legal"
                        underline="always"
                        variant="h6"
                      >
                        Terms and Conditions
                      </Link>
                    </Typography>
                  </Box>
                  {Boolean(touched.policy && errors.policy) && (
                    <FormHelperText error>{errors.policy}</FormHelperText>
                  )}
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign up
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1">
                    Have an account?
                    <Link component={RouterLink} to="/login" variant="h6">
                      Log in
                    </Link>
                  </Typography>
                </Form>
              )}
            </Formik>
            <Dialog
              open={open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              onClose={() => {
                setOpen(false);
              }}
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  There is already an account linked to this email address!
                  Please log in to use Recipedia.
                </DialogContentText>
              </DialogContent>
              <DialogActions className={classes.loginbutton}>
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                  color="primary"
                  variant="contained"
                >
                  Log in
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={googleSignUpOpen}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
              onClose={() => {
                setGoogleSignUpOpen(false);
              }}
            >
              <Formik
                initialValues={{
                  gpolicy: false,
                }}
                validationSchema={Yup.object().shape({
                  gpolicy: Yup.boolean().oneOf(
                    [true],
                    "Please accept the Terms and Conditions"
                  ),
                })}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  touched,
                  values,
                  isValid,
                  dirty,
                }) => (
                  <Form>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <Box alignItems="center" display="flex" ml={-1}>
                          <Checkbox
                            checked={values.gpolicy}
                            name="gpolicy"
                            onChange={handleChange}
                          />
                          <Typography color="textSecondary" variant="body1">
                            I have read the
                            <Link
                              color="primary"
                              component={RouterLink}
                              to="/legal"
                              underline="always"
                              variant="h6"
                            >
                              Terms and Conditions
                            </Link>
                          </Typography>
                        </Box>
                        {Boolean(touched.gpolicy && errors.gpolicy) && (
                          <FormHelperText error>
                            {errors.gpolicy}
                          </FormHelperText>
                        )}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions className={classes.loginbutton}>
                      <GoogleLogin
                        clientId="265952619085-t28mi10gaiq8i88615gkf095289ulddj.apps.googleusercontent.com"
                        buttonText="Log in with Google"
                        onSuccess={handleGoogleSubmit}
                        onFailure={handleGoogleSubmit}
                        render={(renderProps) => (
                          <Button
                            color="primary"
                            variant="contained"
                            disabled={renderProps.disabled}
                            onClick={
                              isValid && dirty ? renderProps.onClick : null
                            }
                            type="submit"
                          >
                            Submit
                          </Button>
                        )}
                      />
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            </Dialog>
          </Container>
        </Box>
      </Page>
    </Scrollbars>
  );
};

export default SignUpView;

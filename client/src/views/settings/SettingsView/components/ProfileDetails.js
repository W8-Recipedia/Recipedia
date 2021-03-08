import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  getUserCredentials,
  changeDetails,
} from "src/components/auth/UserAuth";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  root: {},
}));

const ProfileDetails = ({ className, ...rest }) => {
  const [googleAccount, setGoogleAccount] = useState(false);
  const [changeDetailsSuccess, setChangeDetailsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  useLayoutEffect(() => {
    getUserCredentials().then((authResponse) => {
      if (authResponse.data.loggedIn) {
        setValues({
          firstName: authResponse.data.user.firstname,
          lastName: authResponse.data.user.lastname,
          email: authResponse.data.user.email,
        });
        if (authResponse.data.user.googleId) {
          setGoogleAccount(true);
        }
      }
    });
  }, []);

  const handleSubmit = (values, actions) => {
    console.log(values);
    changeDetails(values.firstName, values.lastName, values.email).then(
      (authResponse) => {
        if (authResponse == "Success") {
          setChangeDetailsSuccess(true);
        } else {
          setChangeDetailsSuccess(false);
        }
        setOpen(true);
      }
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        firstName: Yup.string().max(255).required("First name is required"),
        lastName: Yup.string().max(255).required("Last name is required"),
      })}
      onSubmit={handleSubmit}
    >
      {({ errors, handleBlur, handleChange, touched, values }) => (
        <Form>
          <Card>
            <CardHeader
              subheader="Manage your account settings here"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    label="First name"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.lastName && errors.lastName)}
                    fullWidth
                    helperText={touched.lastName && errors.lastName}
                    label="Last name"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email address"
                    name="email"
                    disabled={googleAccount}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
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
                type="submit"
              >
                Update
              </Button>
            </Box>
          </Card>
          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={() => {
              window.location.reload(false);
            }}
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {changeDetailsSuccess
                  ? "Your details have been changed successfully!"
                  : "The email address specified already exists!"}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;

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
} from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";

import { getUserCredentials } from "src/components/auth/UserAuth";
import PropTypes from "prop-types";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  root: {},
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();

  const [googleAccount, setGoogleAccount] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  useLayoutEffect(() => {
    getUserCredentials().then((authResponse) => {
      if (authResponse.data.loggedIn) {
        setValues({
          firstName: authResponse.data.user[0].firstname,
          lastName: authResponse.data.user[0].lastname,
          email: authResponse.data.user[0].email,
        });
        if (authResponse.data.user[0].googleId) {
          setGoogleAccount(true);
        }
      }
    });
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
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
                fullWidth
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
                disabled={googleAccount}
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
                disabled={googleAccount}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
                disabled={googleAccount}
              />
            </Grid>
            <Grid item md={6} xs={12}></Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" disabled={googleAccount}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;

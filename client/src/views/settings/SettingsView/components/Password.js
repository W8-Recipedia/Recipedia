import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik, Form } from "formik";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {},
});

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });
  const handleSubmit = (values, actions) => {};

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader subheader="Update your password here" title="Password" />
        <Divider />
        <CardContent>
          <Formik
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              password: "",
              policy: false,
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .max(255)
                .required("Password is required")
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                  "Password must contain an uppercase letter, a number, and a symbol"
                )
                .min(8, "Password must be at least 8 characters"),
              confirmPassword: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Passwords must match"
              ),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <TextField
                fullWidth
                label="Current password"
                margin="normal"
                name="currentPassword"
                onChange={handleChange}
                type="password"
                value={values.currentPassword}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="New password"
                margin="normal"
                name="password"
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Confirm password"
                margin="normal"
                name="confirmPassword"
                onChange={handleChange}
                type="password"
                value={values.confirmPassword}
                variant="outlined"
              />
            </Form>
          </Formik>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string,
};

export default Password;

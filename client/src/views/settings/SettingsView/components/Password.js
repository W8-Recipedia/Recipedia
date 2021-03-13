import * as Yup from "yup";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  TextField,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useLayoutEffect, useState } from "react";

import { changePassword } from "src/components/auth/UserAuth";
import { getUserInfo } from "src/components/auth/UserAuth";

const Password = () => {
  const [open, setOpen] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [googleAccount, setGoogleAccount] = useState(false);
  useLayoutEffect(() => {
    getUserInfo().then((authResponse) => {
      if (authResponse.data.user.googleId) {
        setGoogleAccount(true);
      }
    });
    setButtonDisabled(true);
  }, []);

  const handleSubmit = (values, actions) => {
    changePassword(values.currentPassword, values.password).then(
      (authResponse) => {
        if (authResponse === "success") {
          setOpen(true);
          actions.resetForm({});
        } else {
          setWrongPassword(true);
        }
      }
    );
  };

  return (
    <Card>
      <CardHeader subheader="Update your password here" title="Password" />
      <Divider />

      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
          currentPassword: "",
        }}
        validationSchema={Yup.object().shape({
          currentPassword: Yup.string()
            .max(255)
            .required("Please enter your current password"),
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
            <CardContent>
              <TextField
                error={
                  Boolean(touched.currentPassword && errors.currentPassword) ||
                  wrongPassword
                }
                fullWidth
                label="Current password"
                helperText={
                  (touched.currentPassword && errors.currentPassword) ||
                  (wrongPassword ? "The password is incorrect" : null)
                }
                margin="normal"
                name="currentPassword"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setWrongPassword(false);
                  setButtonDisabled(false);
                }}
                type="password"
                value={values.currentPassword}
                variant="outlined"
                disabled={googleAccount}
              />
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                label="New password"
                helperText={touched.password && errors.password}
                margin="normal"
                name="password"
                onChange={(e) => {
                  handleChange(e);
                  setButtonDisabled(false);
                }}
                type="password"
                value={values.password}
                variant="outlined"
                disabled={googleAccount}
              />
              <TextField
                error={Boolean(
                  touched.confirmPassword && errors.confirmPassword
                )}
                fullWidth
                label="Confirm password"
                helperText={touched.confirmPassword && errors.confirmPassword}
                margin="normal"
                name="confirmPassword"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setButtonDisabled(false);
                }}
                type="password"
                value={values.confirmPassword}
                variant="outlined"
                disabled={googleAccount}
              />
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={buttonDisabled || googleAccount}
              >
                Update
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your password has successfully been changed.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Password;

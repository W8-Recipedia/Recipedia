import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  makeStyles,
} from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";

import { Link } from "react-router-dom";
import Page from "src/components/theme/page";
import { Scrollbars } from "react-custom-scrollbars";
import { verifyEmail } from "src/components/auth/UserAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  title: {
    fontSize: 84,
    [theme.breakpoints.up("xs")]: {
      fontSize: 64,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 84,
    },
  },
}));

const VerifyView = () => {
  const classes = useStyles();
  const [verified, setVerified] = useState(false);
  const resendVerification = () => {};

  useLayoutEffect(() => {
    verifyEmail(window.location.pathname.replace("/verify/", "")).then(
      (authResponse) => {
        if (authResponse === "notVerified") {
          setVerified(false);
        } else {
          setVerified(true);
        }
      }
    );
  }, []);

  return (
    <Scrollbars>
      <Page className={classes.root} title="Recipedia">
        <Dialog open={!verified}>
          <DialogContent>
            <Box alignItems="center" justifyContent="center" m={2}>
              <DialogContentText>
                Your email could not be verified. Please click below to send a
                new verification email.
              </DialogContentText>
              <DialogActions>
                <Button
                  color="primary"
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={resendVerification}
                  className={classes.buttonText}
                >
                  Verify
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
        <Dialog open={verified}>
          <DialogContent>
            <Box alignItems="center" justifyContent="center" m={2}>
              <DialogContentText>
                Your email has been verified!
              </DialogContentText>
              <DialogActions>
                <Link to="/login">
                  <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={resendVerification}
                    className={classes.buttonText}
                  >
                    Log in
                  </Button>
                </Link>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </Page>
    </Scrollbars>
  );
};

export default VerifyView;

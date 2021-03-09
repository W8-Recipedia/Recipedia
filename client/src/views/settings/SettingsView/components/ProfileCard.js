import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getUserCredentials,
  deleteAccount,
} from "src/components/auth/UserAuth";
import PropTypes from "prop-types";
import clsx from "clsx";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
  avatar: {
    height: 100,
    width: 100,
  },
  button: {
    color: red[500],
  },
}));

const ProfileCard = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [imageURL, setImageURL] = useState("");
  const [open, setOpen] = React.useState(false);
  const [deleteStatus, setDeleteStatus] = React.useState(false);

  const [userName, setUserName] = useState(() => {
    getUserCredentials().then((authResponse) => {
      if (authResponse.data.loggedIn) {
        setUserName(
          authResponse.data.user.firstname +
            " " +
            authResponse.data.user.lastname
        );
        if (authResponse.data.user.imageUrl) {
          setImageURL(authResponse.data.user.imageUrl);
        }
      }
    });
  });

  const deleteAcc = () => {
    deleteAccount().then((response) => {
      if (response == "success") {
        setOpen(false);
        setDeleteStatus(true);
      }
    });
  };

  return (
    <Card {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Box pb={2}>
            <Avatar className={classes.avatar} src={imageURL} />
          </Box>
          <Typography color="textPrimary" gutterBottom variant="h3">
            {userName}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {""}
          </Typography>
          <Box pt={2}>
            <Button
              color="secondary"
              variant="text"
              className={classes.button}
              onClick={() => {
                setOpen(true);
              }}
            >
              Delete account
            </Button>
          </Box>
        </Box>
      </CardContent>
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
            Are you sure you would like to delete your account? This will delete
            all your data from our databases, including your favourites and
            dietary preferences.
            <Box
              pt={2}
              alignItems="center"
              display="flex"
              flexDirection="column"
            >
              <Box
                pb={2}
                pt={2}
                alignItems="center"
                display="flex"
                flexDirection="column"
              >
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  No, take me back.
                </Button>
              </Box>
              <Button
                color="secondary"
                variant="text"
                className={classes.button}
                onClick={deleteAcc}
              >
                Yes, I'm sure!
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={deleteStatus}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={() => {
          navigate("/");
        }}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your account has been deleted. We're sorry to see you go!
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

ProfileCard.propTypes = {
  className: PropTypes.string,
};

export default ProfileCard;

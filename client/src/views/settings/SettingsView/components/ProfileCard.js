import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { deleteAccount, getUserData } from "src/components/auth/UserAuth";

import { red } from "@material-ui/core/colors";
import { useNavigate } from "react-router-dom";

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
  const [open, setOpen] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [userRank, setUserRank] = useState("");

  const [userName, setUserName] = useState(() => {
    getUserData().then((authResponse) => {
      if (authResponse.data.message === "loggedIn") {
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
    getUserData().then((res) => {
      if (res.data.favourites) {
        const userFavouritesLength = res.data.favourites.length;
        setUserRank(
          userFavouritesLength < 5
            ? "Recipedia Beginner"
            : userFavouritesLength < 10
            ? "Food Connoisseur"
            : userFavouritesLength < 15
            ? "Sustenance Master"
            : "Nourishment God"
        );
      } else {
        setUserRank("Recipedia Beginner");
      }
    });
  });

  const deleteAcc = () => {
    deleteAccount().then((response) => {
      if (response === "accountDeleted") {
        setOpen(false);
        setDeleteStatus(true);
      }
    });
  };

  return (
    <Card {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Box pb={3}>
            <Avatar className={classes.avatar} src={imageURL} />
          </Box>
          <Box pb={1}>
            <Typography color="textPrimary" gutterBottom variant="h3">
              {userName}
            </Typography>
          </Box>
          <Box pb={2}>
            <Typography color="textSecondary" gutterBottom variant="body1">
              {userRank}
            </Typography>
          </Box>

          <Box>
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
      >
        <DialogContent>
          <DialogContentText>
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
        onClose={() => {
          navigate("/");
        }}
      >
        <DialogContent>
          <DialogContentText >
            Your account has been deleted. We're sorry to see you go!
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProfileCard;

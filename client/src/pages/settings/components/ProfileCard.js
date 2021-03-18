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
import {
  deleteAccount,
  getUserData,
  logOut,
} from "src/components/ServerRequests";

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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState();
  const [userRank, setUserRank] = useState("");

  const [userName, setUserName] = useState(() => {
    getUserData().then((response) => {
      if (response.data.message === "loggedIn") {
        setUserName(
          response.data.user.firstname + " " + response.data.user.lastname
        );
        if (response.data.user.imageUrl) {
          setImageURL(response.data.user.imageUrl);
        }
      } else {
        logOut();
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

  const deleteUserAccount = () => {
    deleteAccount().then((response) => {
      setOpenDeleteDialog(false);
      setDeleteStatus(response.data.message);
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
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h3"
              align="center"
            >
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
                setOpenDeleteDialog(true);
              }}
            >
              Delete account
            </Button>
          </Box>
        </Box>
      </CardContent>

      <Dialog
        open={deleteStatus}
        onClose={() => {
          navigate("/");
        }}
      >
        <Box p={1}>
          <DialogContent>
            <DialogContentText>
              <Box alignItems="center" justifyContent="center" display="flex">
                {deleteStatus === "accountDeleted"
                  ? "Your account has been deleted. We're sorry to see you go!"
                  : "Your account couldn't be deleted. Please try again later."}
              </Box>
            </DialogContentText>
          </DialogContent>
        </Box>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
        }}
      >
        <Box p={1}>
          <DialogContent>
            <DialogContentText>
              <Box alignItems="center" justifyContent="center" display="flex">
                Are you sure you would like to delete your account? This will
                delete all your data from our databases, including your
                favourites and dietary preferences, allergens and health data.
                This action is irreversible.
              </Box>
            </DialogContentText>
          </DialogContent>
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            pb={2}
          >
            <Button
              color="secondary"
              variant="text"
              className={classes.button}
              onClick={deleteUserAccount}
            >
              Yes, I'm sure!
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Card>
  );
};

export default ProfileCard;

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import Axios from "axios";
import PropTypes from "prop-types";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const ProfileCard = ({ className, ...rest }) => {
  const classes = useStyles();
  const [userName, setUserName] = useState("Not logged in");

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setUserName(
          response.data.user[0].firstname + " " + response.data.user[0].lastname
        );
      }
    });
  }, []);
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Box pb={2}>
            <Avatar className={classes.avatar} src={"/static/images/avatars/avatar_6.png"} />
          </Box>
          <Typography color="textPrimary" gutterBottom variant="h3">
            {userName}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {""}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

ProfileCard.propTypes = {
  className: PropTypes.string,
};

export default ProfileCard;

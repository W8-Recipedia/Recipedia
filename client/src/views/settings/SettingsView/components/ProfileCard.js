import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";

import { getUserCredentials } from "src/components/auth/UserAuth";
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
  const [imageURL, setImageURL] = useState("");

  const [userName, setUserName] = useState(() => {
    getUserCredentials().then((authResponse) => {
      if (authResponse.data.loggedIn) {
        setUserName(
          authResponse.data.user[0].firstname +
            " " +
            authResponse.data.user[0].lastname
        );
      }
      if (authResponse.data.user[0].imageUrl) {
        setImageURL(authResponse.data.user[0].imageUrl);
      }
    });
  });

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
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
        </Box>
      </CardContent>
      {/* <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions> */}
    </Card>
  );
};

ProfileCard.propTypes = {
  className: PropTypes.string,
};

export default ProfileCard;

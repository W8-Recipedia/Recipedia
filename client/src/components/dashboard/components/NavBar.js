import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  HelpCircle as FAQIcon,
  MessageCircle as FeedbackIcon,
  Heart as HeartIcon,
  Home as HomeIcon,
  AlertTriangle as LegalIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
} from "react-feather";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import NavItem from "src/components/dashboard/components/NavItem";
import { Scrollbars } from "react-custom-scrollbars";
import { getUserData } from "src/components/ServerRequests";

const items = [
  {
    href: "/app/home",
    icon: HomeIcon,
    title: "Home",
  },
  {
    href: "/app/search",
    icon: SearchIcon,
    title: "Search",
  },
  {
    href: "/app/favourites",
    icon: HeartIcon,
    title: "Favourites",
  },
  {
    href: "/app/settings",
    icon: SettingsIcon,
    title: "Settings",
  },
  {
    href: "/app/faq",
    icon: FAQIcon,
    title: "FAQ",
  },
  {
    href: "/app/feedback",
    icon: FeedbackIcon,
    title: "Feedback",
  },
  {
    href: "/app/legal",
    icon: LegalIcon,
    title: "Legal",
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [userImage, setUserImage] = useState("");
  const [userRank, setUserRank] = useState("");
  const [userName, setUserName] = useState("");

  useLayoutEffect(() => {
    getUserData().then((response) => {
      if (response.data.message === "loggedIn") {
        setUserName(
          response.data.user.firstname + " " + response.data.user.lastname
        );
      }
      if (response.data.user.imageUrl) {
        setUserImage(response.data.user.imageUrl);
      }
      getUserData().then((response) => {
        if (response.data.favourites) {
          const userFavouritesLength = response.data.favourites.length;
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
  }, []);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Scrollbars>
      <Box height="100%" display="flex" flexDirection="column">
        <Box alignItems="center" display="flex" flexDirection="column" p={2}>
          <Box pb={2}>
            <Avatar
              className={classes.avatar}
              component={RouterLink}
              src={userImage}
              to="/app/settings"
            />
          </Box>
          <Box pb={1}>
            <Typography
              className={classes.name}
              color="textPrimary"
              variant="h5"
              align="center"
            >
              {userName}
            </Typography>
          </Box>
          <Box pb={1}>
            <Typography color="textSecondary" variant="body2">
              {userRank}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          <List>
            {items.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </List>
        </Box>
      </Box>
    </Scrollbars>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;

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
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { getUserCredentials } from "src/components/auth/UserAuth";

import NavItem from "./NavItem";
import PropTypes from "prop-types";

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
  const [userName, setUserName] = useState(() => {
    getUserCredentials().then((authResponse) => {
      if (authResponse.data.loggedIn) {
        setUserName(
          authResponse.data.user[0].firstname +
            " " +
            authResponse.data.user[0].lastname
        );
      }
    });
  });

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Box pb={2}>
          <Avatar
            className={classes.avatar}
            component={RouterLink}
            src={"/static/images/avatars/avatar.png"}
            to="/app/settings"
          />
        </Box>
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {userName}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {""}
        </Typography>
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

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;

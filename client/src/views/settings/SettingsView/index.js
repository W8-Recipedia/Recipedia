import React from "react";
import { Box, Container, Grid, Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import Page from "src/components/Page";
import Preferences from "src/views/settings/SettingsView/components/Preferences";
import Password from "src/views/settings/SettingsView/components/Password";
import ProfileCard from "src/views/settings/SettingsView/components/ProfileCard";
import ProfileDetails from "src/views/settings/SettingsView/components/ProfileDetails";
import { Scrollbars } from "react-custom-scrollbars";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const SettingsView = () => {
  const classes = useStyles();

  return (
    <Scrollbars>
      <Page className={classes.root} title="Recipedia | Settings">
        <Container maxWidth="lg">
          <Card variant="outlined">
            <CardContent>
              <Box p={1}>
                <Typography gutterBottom variant="h1">
                  Your settings.
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Adjust your personal details, dietary preferences, allergens and health data on this page.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
        <Container maxWidth="lg">
          <Box mb={3} mt={3}>
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <ProfileCard />
              </Grid>

              <Grid item lg={8} md={6} xs={12}>
                <ProfileDetails />
              </Grid>
            </Grid>
          </Box>
          <Preferences />
          <Box mt={3}>
            <Password />
          </Box>
        </Container>
      </Page>
    </Scrollbars>
  );
};

export default SettingsView;

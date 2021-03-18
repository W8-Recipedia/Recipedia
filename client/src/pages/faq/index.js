import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";

import Page from "src/components/theme/page";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const FAQView = () => {
  const classes = useStyles();

  return (
    <Scrollbars>
      <Page className={classes.root} title="FAQ | Recipedia">
        <Box m={2}>
          <Container maxWidth={false}>
            <Card>
              <CardContent>
                <Box p={1}>
                  <Typography gutterBottom variant="h1">
                    Frequently Asked Questions
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    If you have any questions, you'll find that they're likely
                    answered right here.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Container>
          <Container maxWidth={false}>
            <Box mb={3} mt={3}>
              <Card>
                <CardHeader
                  title="What is Recipedia?"
                  subheader="Recipedia is a web application that seeks to revolutionize the way that people find personalised recipes. It recommends the most suitable recipes to users based on their dietary preferences, allergies, and much more. It also has a search function, which allows users to filter recipes by cuisine, diet, or calories."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Who built Recipedia?"
                  subheader="Just a bunch of university students struggling with a horrible pandemic."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Will Recipedia recommend food that will kill me?"
                  subheader="Probably not, unless you are allergic to shellfish that is."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="How can I submit an enquiry about features?"
                  subheader="Use the feedback page, but don't expect an answer as we are soo done with this."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Why does the Recipedia team get soo much hate?"
                  subheader="They hate us cuz they ain't us - Shadi the Big Daddy."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Can I use Google to log into Recipedia?"
                  subheader="Yes, but only if you use darkmode."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Will we ever hear Yuxuan's voice?"
                  subheader="Yes. No. Maybe. Well, we hope so..."
                />
              </Card>
            </Box>
          </Container>
        </Box>
      </Page>
    </Scrollbars>
  );
};

export default FAQView;

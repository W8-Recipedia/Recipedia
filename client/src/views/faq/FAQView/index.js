import React from "react";
import {
  Card,
  Box,
  CardHeader,
  Container,
  makeStyles,
} from "@material-ui/core";
import Page from "src/components/Page";

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
    <Page className={classes.root} title="Recipedia | FAQ">
      <Container maxWidth="lg">
        <Box mb={3}>
          <Card>
            {/* <Box p={2}>
            <Typography color="textPrimary"
              variant="h3">
              Frequently Asked Questions
            </Typography>
            </Box> */}
            <CardHeader title="Frequently Asked Questions" />
          </Card>
        </Box>

        <Box mb={3}>
          <Card>
            <CardHeader
              title="What is recipedia?"
              subheader="Recipedia is a web application that seeks to revolutionize the way that people find personalised recipes. It recommends the most suitable recipes to users based on their dietary preferences, allergies, and much more. It also has a search function, which allows users to filter recipes by cuisine, diet, or calories."
            />
          </Card>
        </Box>

        <Box mb={3}>
          <Card>
            <CardHeader
              title="Who built Recipedia"
              subheader="Just a bunch of university students struggling with a horrible pandemic."
            />
          </Card>
        </Box>

        <Box mb={3}>
          <Card>
            <CardHeader
              title="Will Recipedia reccommend food that will kill me?"
              subheader="Probably not, unless you are alergic to shellfish that is."
            />
          </Card>
        </Box>

        <Box mb={3}>
          <Card>
            <CardHeader
              title="How can I submit an inquiry about features?"
              subheader="Use the feedback page, however, don't expect an answer as we are soo done with this."
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
              title="Can I use google to log into recipedia?"
              subheader="Yes but only if you use darkmode."
            />
          </Card>
        </Box>

        <Box mb={3}>
          <Card>
            <CardHeader
              title="Will we ever hear Yuxuan's voice"
              subheader="Yes. No. Maybe. Well, we hope so..."
            />
          </Card>
        </Box>
      </Container>
    </Page>
  );
};

export default FAQView;

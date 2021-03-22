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
                    If you have any questions, you'll most likely find that
                    they're answered right here.
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
                  subheader="Recipedia is a web application that revolutionizes the way that people find recipes. It recommends the most suitable recipes to users based on their dietary preferences, allergies, health data, and much more."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="How do I use Recipedia?"
                  subheader="To get started, head over to the settings page and fill in all the relevant information that you would like to provide us. You are now ready to start your Recipedia experience! From now on, the home page will display recipes curated just for you. If you'd like to find any particular recipes, then the search page is your next destination. You can save any recipes that pique your interest using the heart icon; these can quickly be found on the favourites page."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Why does Recipedia ask for my details?"
                  subheader="Your details help personalize your recipe finding experience. Recipedia is still entirely usable without the provision of your personal details, but the strength of recommendations will be severely limited."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Will my information be secure?"
                  subheader="Any infomation that you choose to provide will be protected using military-grade encryption algorithms."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="What is TDEE?"
                  subheader="TDEE stands for 'Total Daily Energy Expenditure'. It is a health metric that uses your sex, age and BMI in order to determine (approximately) the number of calories you burn each day. If you choose to provide the aforementioned details, you will be given a caloric range recommendation for each meal of the day, which you can use to further tailor the recipes shown to you."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="What is BMI?"
                  subheader="BMI stands for 'Body Mass Index', which uses your height and weight to determine your nutritional status. This calculation forms part of your TDEE."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Where do the recipes come from?"
                  subheader="Recipedia uses the Spoonacular API to filter through thousands of recipes, before parsing and displaying them beautifully for you to enjoy."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Why is my diet, allergen, or cuisine not available?"
                  subheader="The recipes shown on Recipedia are limited by Spoonacular's list of diets, allergens and cuisines. We are continually working to implement a wider variety of filters, and appreciate your patience in the meantime."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Why can I not change my name, email or password?"
                  subheader="You have most likely signed in through Google, meaning that your personal data is synced with your Google account. If you'd like to change any of these details, including your profile picture, you can do so through your Google settings."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="How do I report bugs or suggest features?"
                  subheader="We are sorry that you found an issue with Recipedia! We would greatly appreciate if you would let us know about it through the feedback page. We thank you for helping make Recipedia a better platform."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="How is Recipedia built?"
                  subheader="Recipedia was created using React with Material-UI for the front-end, Express for the back-end, and MySQL for the database management system. The client is hosted on Netlify, and is connected to a server on Heroku."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Who built Recipedia?"
                  subheader="Recipedia was developed by a group of aspirational computer science students at the University of Manchester."
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

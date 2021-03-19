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
          <Container maxWidth="xl">
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
                    If you have any questions, you'll find that they're likely answered
                    right here.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Container>
          <Container maxWidth="xl">
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
                  title="How do I use Recipedia?"
                  subheader="Recipedia is a lucid, quick and easy to navigate website.To get started with your Recipedia experience you should navigate to settings and fill in your preferences and health related information. Then navigate to the homepage where we curate and recommend delightful assortments based on your information entered within Recipedia's settings. You should examine each of the recommended recipes and save them for later by selecting the red heart displayed towards the bottom of the card. If you have a recipe you cannot find you can use the search page to find them."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Why are you asking for my details?"
                  subheader="We ask for your details to vastly improve and personalise your experience with Recipedia. You will still be able to use Recipedia's functions without entering your preferences however you will not be able to utilise Recipedia to its full potential."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Will my information be secure?"
                  subheader="Any infomation related to your account will be completely encrypted and safely stored within our databases."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="What is TDEE?"
                  subheader="TDEE stands for total daily energy expenditure, it is a calculation that uses your age, weight, height and your BMI (BMI explained below). This calculation represents the amount of calories you burn per day. If you enter your age, weight and height in the settings panel we will calculate your TDEE and use this information to aid in the recommendation of recipes to you and further improve your experience with Recipedia."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="What is BMI?"
                  subheader="BMI stands for body mass index, it is a calculation that uses your height and weight to determine if your weight is of a healthy standard. This calculation is used to calculate your TDEE (see above)."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Where does Recipedia get its recipes from?"
                  subheader="Recipedia utilises spoonacular API (https://spoonacular.com). Spoonacular is the best fit for Recipedia as their engineers have many years of knowledge on every aspect of food and its recipes. Additionally, their API consists of more than 5000 unique recipes which we filter through and find the best recipes for you."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Why isn't diet X or allergen Y or cuisine Z included?"
                  subheader="The recipes listed on Recipdia are scraped from spoonacular API, therefore our recipes, allergies and cuisines are limited to their filters/parameters. However as Recipedia progresses we aim to expand our recipes, allergy and cuisine options."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Why can't I change my name/email/password?"
                  subheader="The reason you are unable to change your name, email or password is because you have signed into Recipedia using a Google Account. If you would like to change any of these details you will need to navigate to your Google account settings: https://myaccount.google.com"
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="How do I report bugs/suggest features?"
                  subheader="If you encounter a bug or simply want to suggest features, we would greatly appreciate it if you would inform us of this, to do this head over to the Feedback page and type your issue into the feedback field, your name and email will already be filled out for you."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="Who built Recipedia?"
                  subheader="Recipedia is developed by a group of students studying at the University of Manchester as a project in their first year."
                />
              </Card>
            </Box>
            <Box mb={3}>
              <Card>
                <CardHeader
                  title="How is Recipedia built?"
                  subheader="Recipedia is built using the PERN stack, this entails the usage of PostgreSQL, Express, React and Nodejs. Recipedia is hosted using HerokuApp."
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

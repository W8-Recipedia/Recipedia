import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  TextField,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Preferences = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Manage your preferences here"
          title="Preferences"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
                Diet
              </Typography>
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Vegan"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Vegetarian"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Paleo"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Primal"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Whole30"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Lacto-vegeterian"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Ovo-vegetarian"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Pescetarian"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Ketogenic"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Gluten free"
              />

            </Grid>
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
                Allergens
              </Typography>
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Dairy"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Grain"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Peanut"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Shellfish"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Seafood"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Soy"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Soy"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Soy"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Soy"
              />
              <FormControlLabel
                control={(
                  <Checkbox/>
                )}
                label="Soy"
              />
            </Grid>
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
                Health Metrics
              </Typography>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  >
                  <TextField
                    fullWidth
                    label="Height (cm)"
                    type="number"
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  >
                  <TextField
                    fullWidth
                    label="Weight (kg)"
                    type="number"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Preferences.propTypes = {
  className: PropTypes.string
};


export default Preferences;

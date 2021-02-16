import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceValue: {
    marginRight: theme.spacing(1)
  }
}));

const BMICharts = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              BMI
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              19.2 {/*  MAKE DYNAMIC */}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <EqualizerOutlinedIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowUpwardIcon className={classes.differenceIcon}/>
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            16% {/*  MAKE DYNAMIC */}
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

BMICharts.propTypes = {
  className: PropTypes.string
};

export default BMICharts;

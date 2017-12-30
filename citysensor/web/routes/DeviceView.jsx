import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  item: {
    textAlign: 'center',
  },
});

const DeviceView = ({ classes }) => (
  <Grid container className={classes.root}>
    <Grid item className={classes.item}>
      <h1>Device is registered!</h1>
    </Grid>
  </Grid>
);

DeviceView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(DeviceView);

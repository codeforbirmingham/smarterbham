import React from 'react';
import PropTypes from 'prop-types';
import Reboot from 'material-ui/Reboot';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Head from 'next/head';

const styles = () => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

const App = props => (
  <div>
    <Reboot />
    <Head>
      <link rel="stylesheet" href="/static/css/fonts.css" />
      <link rel="stylesheet" href="/static/css/font-awesome.min.css" />
    </Head>
    <Grid container className={props.classes.root}>
      {props.children}
    </Grid>
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(App);

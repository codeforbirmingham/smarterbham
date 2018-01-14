import React from 'react';
import PropTypes from 'prop-types';
import Reboot from 'material-ui/Reboot';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import NProgress from 'nprogress';
import Head from 'next/head';
import Router from 'next/router';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const styles = () => ({
  root: {
    height: '100%',
  },
});

const App = props => (
  <div style={{ height: '100%' }}>
    <Reboot />
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="/static/css/fonts.css" />
      <link rel="stylesheet" href="/static/css/font-awesome.min.css" />
      <link rel="stylesheet" type="text/css" href="/static/css/nprogress.min.css" />
    </Head>
    <style jsx="true" global="true">{`
      html, body { 
        height: 100%;
      }
    `}</style>
    <Grid
      container
      alignItems="center"
      justify="center"
      className={props.classes.root}
    >
      <div id="notification" />
      {props.children}
    </Grid>
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(App);

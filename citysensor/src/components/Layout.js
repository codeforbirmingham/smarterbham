/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Head from 'next/head';

const App = props => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="/static/css/fonts.css" />
      <link rel="stylesheet" href="/static/css/font-awesome.min.css" />
      <link rel="stylesheet" type="text/css" href="/static/css/nprogress.min.css" />
    </Head>
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ height: '100vh', width: '100%' }}
    >
      {props.children}
    </Grid>
    <div id="notification" />
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;

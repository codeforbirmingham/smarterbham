/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withRouter } from 'next/router';
import Layout from '../components/Layout';

const NoMatchView = ({ router, href }) => (
  <Layout>
    <Grid item>
      <img
        src="/static/img/404.png"
        alt="Page Not Found"
      />
      <Typography type="subheading">
        Nothing exists at <span>{href}</span>
      </Typography>
      <Button onClick={() => router.push('/')}><i className="fa fa-hand-o-left" /> Go Back</Button>
    </Grid>
  </Layout>
);

NoMatchView.propTypes = {
  router: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
};

export default withRouter(NoMatchView);

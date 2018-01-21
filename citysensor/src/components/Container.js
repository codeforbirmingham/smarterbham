/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

const Container = props => (
  <Grid
    container
    alignItems="center"
    justify="center"
    style={{ height: props.viewportHeight ? '100vh' : '100%', width: '100%' }}
  >
    {props.children}
  </Grid>
);

Container.defaultProps = {
  viewportHeight: false,
};

Container.propTypes = {
  children: PropTypes.object.isRequired,
  viewportHeight: PropTypes.bool,
};

export default Container;

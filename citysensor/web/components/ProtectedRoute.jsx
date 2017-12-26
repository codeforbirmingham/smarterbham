/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  Redirect,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ exact, path, component, isRegistered }) => (
  <Route
    exact={exact}
    path={path}
    render={props => (
      isRegistered ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/register',
          state: { from: props.location },
        }}
        />
      )
    )}
  />
);

ProtectedRoute.defaultProps = {
  exact: false,
  location: {},
};

ProtectedRoute.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

export default ProtectedRoute;

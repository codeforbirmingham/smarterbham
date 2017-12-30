import React from 'react';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
// Routes
import ProtectedRoute from '../components/ProtectedRoute';
import Register from './Register';
import Login from './Login';
import DeviceView from './DeviceView';
import NoMatch from './NoMatch';

const Main = () => (
  <Switch>
    <Route exact path="/register" component={Register} />
    <ProtectedRoute exact path="/" component={DeviceView} isRegistered={false} />
    <Route component={NoMatch} />
  </Switch>
);

export default withRouter(Main);

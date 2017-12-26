import React from 'react';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
// Routes
import Login from './Login';
import NoMatch from './NoMatch';

const Main = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route component={NoMatch} />
  </Switch>
);

export default withRouter(Main);

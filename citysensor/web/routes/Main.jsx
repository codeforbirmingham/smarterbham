import React from 'react';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

// Routes
import Register from './Register';
import DeviceView from './DeviceView';
import NoMatch from './NoMatch';

const Main = () => (
  <Switch>
    <Route exact path="/register" component={Register} />
    <Route exact path="/" component={DeviceView} />
    <Route component={NoMatch} />
  </Switch>
);

export default withRouter(Main);

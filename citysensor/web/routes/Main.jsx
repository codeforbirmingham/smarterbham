import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

// Routes
import Login from './Login';

const Main = () => (
  <Router>
    <Route exact path="/" component={Login} />
  </Router>
);

export default Main;

import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GithubUsers from '../pages/GithubUsers';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={GithubUsers} />
    </Switch>
  </Router>
);

export default Routes;

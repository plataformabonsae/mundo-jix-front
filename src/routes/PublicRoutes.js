import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import history from 'utils/history';

import Auth from 'containers/Auth'
import Join from 'containers/Join'



const Routes = () => (
  <Router history={history}>
    <Switch>
      <Redirect exact from="/" to="/auth/talento/login" />
      <Route path="/auth/:type/:action" component={Auth} />
      <Route path="/join/:type/:action" component={Join} />
      {/* <Route component={PageError} /> */}
    </Switch>
  </Router>
);

export default Routes;
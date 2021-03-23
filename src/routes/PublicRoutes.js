import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import history from 'utils/history';

import Auth from 'containers/Auth'
import Join from 'containers/Join'
import NotFound from 'containers/404'



const Routes = () => (
  <Router history={history}>
    <Switch>

      {/* Temp */}
      <Redirect exact from="/" to="/auth/talento/login" />

      {/* Login, Signup pre-step */}
      <Route path="/auth/:type/:action" component={Auth} />

      {/* signup pos-step */}
      <Route path="/join/:type/:action" component={Join} />
      
      {/* notFound */}
      <Route path="/404" component={NotFound} />

    </Switch>
  </Router>
);

export default Routes;
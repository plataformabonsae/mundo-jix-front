import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import history from 'browserHistory';


const Routes = () => (
  <Router history={history}>
    <Switch>
      <Redirect exact from="/" to="/project" />
      <Route path="/auth/:type/:action" component={Authenticate} />
      {/* <Route path="/project" component={Project} /> */}
      {/* <Route component={PageError} /> */}
    </Switch>
  </Router>
);

export default Routes;
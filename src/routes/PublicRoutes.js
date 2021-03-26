import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom'

import history from 'utils/history'

import Auth from 'containers/public/Auth'
import Join from 'containers/public/Join'
// import NotFound from 'containers/public/404'

import { Dashboard } from 'containers/private/Dashboard'
import { Profile } from 'containers/private/Profile'

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
      {/* <Route path="/404" component={NotFound} /> */}
      <Redirect exact from="/404" to="/auth/talento/login" />

      {/* Dashboard */}
      <Route path="/dashboard/:type" component={Dashboard} />

      {/* Perfil */}
      <Route path="/perfil/:type/:action" component={Profile} />
      <Redirect from="/perfil/:type" to="/perfil/:type/pessoal" />

    </Switch>
  </Router>
);

export default Routes;
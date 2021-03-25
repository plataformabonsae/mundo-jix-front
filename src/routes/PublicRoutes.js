import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom'

import history from 'utils/history'

import { Menu } from 'components/Menu'
import { Header } from 'components/Header'

import Auth from 'containers/public/Auth'
import Join from 'containers/public/Join'
import NotFound from 'containers/public/404'

import { Dashboard } from 'containers/private/Dashboard'

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

      {/* notFound */}
      <Route path="/dashboard">
        <Menu />
        <Header name={'Gabriela Salomão Silveira'} />
        <Dashboard></Dashboard>
      </Route>

    </Switch>
  </Router>
);

export default Routes;
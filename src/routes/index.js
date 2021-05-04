import React from "react"; // useState // useEffect,
import {
  // BrowserRouter as Router,
  Router,
  // Switch,
  // Route,
  // Redirect,
  // useLocation,
} from "react-router-dom";

// import { PrivateRoutes } from './PrivateRoutes'
// import { PublicRoutes } from './PublicRoutes'

// import { PrivateRouteContainer } from './PrivateRouteContainer'

import history from "utils/history";

import { ProvideAuth } from "utils/context/auth";

import { RoutesConfig } from "./routes";

const Routes = () => {
  return (
    <ProvideAuth>
      <Router history={history}>
        <RoutesConfig />
      </Router>
    </ProvideAuth>
  );
};

export { Routes };

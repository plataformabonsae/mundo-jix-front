import React from "react"; // useState // useEffect,
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// import { PrivateRoutes } from './PrivateRoutes'
// import { PublicRoutes } from './PublicRoutes'

// import { PrivateRouteContainer } from './PrivateRouteContainer'

import Auth from "containers/public/Auth";
import { Home } from "containers/public/Home";
// import { Recover } from "containers/public/Recover"; // import Join from 'containers/public/Join'

import { Dashboard } from "containers/private/Dashboard";
import { Profile } from "containers/private/Profile";
import { Challenges } from "containers/private/Challenges";
import { Logout } from "containers/private/Logout";
import { Join } from "containers/private/Join";
import { Judges } from "containers/private/Judges";
import { Project } from "containers/private/Project";

// import { Loading } from "components/Loading";
import { ModalPage } from "components/ModalPage";
import { PrivateRouteContainer } from "./PrivateRouteContainer";

// import { autoLogin } from "services/login";

const RoutesConfig = () => {
  let location = useLocation();
  let background = location.state && location.state.background;
  // const token = window.localStorage.getItem("token");
  const accepted_terms = parseInt(
    window.localStorage.getItem("accepted_terms")
  );

  const { data: usertype } = useSelector((state) => state.usertype);
  const { data: user, logged } = useSelector((state) => state.user);

  // const dispatch = useDispatch();
  // dispatch(autoLogin())
  // console.log(auth)
  // console.log(user)
  // auth.setAuth(hasUser)

  // useEffect(() => {
  //   if (!token) dispatch(autoLogin());
  // }, [dispatch, token]);

  return (
    <div>
      <Switch location={background || location}>
        <>
          {user || logged ? (
            accepted_terms === 0 ? (
              <>
                {/* Join */}
                <Route path="/join/:type/:action" component={Join} />

                <Redirect from="*" to={`/join/${usertype}/terms`} />
              </>
            ) : (
              <>
                {/* Dashboard */}
                <PrivateRouteContainer
                  path="/dashboard/"
                  component={Dashboard}
                />

                {/* Desafios */}
                <PrivateRouteContainer
                  path="/desafios"
                  component={Challenges}
                />

                {/* Perfil */}
                <PrivateRouteContainer
                  path="/perfil/:action"
                  component={Profile}
                />

                {/* Logout */}
                <PrivateRouteContainer
                  path="/auth/:type/logout"
                  component={Logout}
                />

                {/* Projeto */}
                <PrivateRouteContainer
                  path={`/projeto/:id`}
                  component={Project}
                />

                <PrivateRouteContainer
                  path={`/mentor/:action/:id`}
                  component={Judges}
                />
                <PrivateRouteContainer
                  path={`/jurado/:action/:id`}
                  component={Judges}
                />

                <Route render={() => <Redirect to="/dashboard" />} />

                {/* Logout
                    <PrivateRouteContainer
                      path={["/dashboard"]}
                      children={<ModalPage />}
                    /> */}

                {/* <Redirect from="/join" to={`/dashboard`} /> */}

                {/* <Redirect from="/auth/:type/:action" to={`/dashboard/${usertype}`} /> */}
              </>
            )
          ) : (
            <>
              {/* Auth */}
              <Route
                exact
                path="/auth/:type"
                render={({ match }) => (
                  <Redirect to={`/auth/${match.params.type}/login`} />
                )}
              />
            </>
          )}
          <Route exact path="/" component={Home} />

          <Route path="/auth/:type/:action" component={Auth} />
        </>
        <Route render={() => <Redirect to="/auth/talento/login" />} />
      </Switch>
      <Route path={["/*/modal/:type/:id"]} children={<ModalPage />} />
    </div>
  );
};

export { RoutesConfig };

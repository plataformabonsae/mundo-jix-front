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
import { MyChallenges } from "containers/private/MyChallenges";
import { Challenges } from "containers/private/Challenges";
import { Challenge } from "containers/private/Challenge";
import { Logout } from "containers/private/Logout";
import { Join } from "containers/private/Join";
import { Judges } from "containers/private/Judges";
import { Project } from "containers/private/Project";
import { Subscription } from "containers/private/Subscription";
import { TrilhaWatch } from "containers/private/TrilhaWatch";

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
                {(usertype === "talento" || usertype === "empresa") && (
                  <>
                    {/* Join */}
                    <Route path="/join/:type/:action" component={Join} />

                    {/* Dashboard */}
                    <PrivateRouteContainer
                      path="/dashboard/"
                      component={Dashboard}
                    />

                    {/* Meus Desafios */}
                    <PrivateRouteContainer
                      exact
                      path="/meus-desafios/:type"
                      component={MyChallenges}
                    />
                    <PrivateRouteContainer
                      exact
                      path="/meus-desafios/:type/:id/:page"
                      component={Challenge}
                    />
                    <PrivateRouteContainer
                      exact
                      path="/meus-desafios/:type/:id/trilha/:trilha_id"
                      component={TrilhaWatch}
                    />
                    <Route
                      exact
                      path="/meus-desafios/:type/:id/"
                      render={({ match }) => (
                        <Redirect
                          to={`/meus-desafios/${match.params.type}/${match.params.id}/inicio`}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/meus-desafios"
                      render={() => (
                        <Redirect to={`/meus-desafios/autodesafio`} />
                      )}
                    />

                    {/* Desafios */}
                    <PrivateRouteContainer
                      exact
                      path="/desafios/:type"
                      component={Challenges}
                    />
                    <PrivateRouteContainer
                      path="/desafios/:type/inscricao/:id/:step"
                      component={Subscription}
                    />
                    <Route
                      exact
                      path="/desafios"
                      render={() => <Redirect to={`/desafios/autodesafio`} />}
                    />

                    {/* Desafio */}
                    <PrivateRouteContainer
                      exact
                      path="/desafio/:id"
                      component={Challenge}
                    />

                    {/* Perfil */}
                    <PrivateRouteContainer
                      path="/perfil/:action"
                      component={Profile}
                    />
                    <Route
                      exact
                      path="/perfil"
                      render={() => <Redirect to={`/perfil/pessoal`} />}
                    />
                  </>
                )}
                {(usertype === "mentor" || usertype === "jurado") && (
                  <>
                    <PrivateRouteContainer
                      path={`/mentor/:action/:id`}
                      component={Judges}
                    />
                    <PrivateRouteContainer
                      path={`/jurado/:action/:id`}
                      component={Judges}
                    />
                  </>
                )}
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
        {(usertype === "mentor" || usertype === "jurado") && (
          <Route render={() => <Redirect to={`/mentor/projeto/1`} />} />
        )}
        <Route render={() => <Redirect to="/auth/talento/login" />} />
      </Switch>
      <Route path={["/*/modal/:type/:id"]} children={<ModalPage />} />
    </div>
  );
};

export { RoutesConfig };

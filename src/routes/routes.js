import React from "react"; // useState // useEffect,
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// import { PrivateRoutes } from './PrivateRoutes'
// import { PublicRoutes } from './PublicRoutes'

// import { PrivateRouteContainer } from './PrivateRouteContainer'

import Auth from "containers/public/Auth";
// import { Home } from "containers/public/Home";
import { NotFound } from "containers/public/NotFound";
// import { Recover } from "containers/public/Recover"; // import Join from 'containers/public/Join'

import { Dashboard } from "containers/private/Dashboard";
import { Profile } from "containers/private/Profile";
import { MyChallenges } from "containers/private/MyChallenges";
import { MyChallengesCompany } from "containers/private/MyChallengesCompany";
import { Challenges } from "containers/private/Challenges";
import { CreateTrail } from "containers/private/CreateTrail";
import { Users } from "containers/private/Users";
import { Challenge } from "containers/private/Challenge";
import { Logout } from "containers/private/Logout";
import { Join } from "containers/private/Join";
import { Judges } from "containers/private/Judges";
import { Project } from "containers/private/Project";
import { Subscription } from "containers/private/Subscription";
import { TrilhaWatch } from "containers/private/TrilhaWatch";
import { NewChallenge } from "containers/private/NewChallenge";

// import { Loading } from "components/Loading";
import { ModalPage } from "components/ModalPage";
import { Loading } from "components/Loading";
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
  const { data: user, logged, loading } = useSelector((state) => state.user);

  return (
    <div>
      <Switch location={location}>
        {/* <Route component={NotFound} /> */}
      </Switch>
      {loading && <Loading full />}

      {user ? (
        accepted_terms === 0 ? (
          <Switch location={location}>
            {/* Join */}
            <Route exact path="/join/:type/:action" component={Join} />
            <Redirect from="*" to={`/join/${usertype}/terms`} />
          </Switch>
        ) : (
          <>
            {usertype === "talento" && (
              <Switch location={location}>
                {/* Join */}
                <Route exact path="/join/:type/:action" component={Join} />

                {/* Dashboard */}
                <PrivateRouteContainer
                  exact
                  path="/dashboard"
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
                  path="/meus-desafios/:type/:id/:page/:trail_type"
                  component={Challenge}
                />
                <PrivateRouteContainer
                  exact
                  path="/meus-desafios/:type/:id/trilha/:trail_type/:trail_id"
                  component={TrilhaWatch}
                />
                {/* <PrivateRouteContainer
                      exact
                      path="/meus-desafios/:type/:id/forum/:forum_id"
                      component={Challenge}
                    /> */}
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
                  render={() => <Redirect to={`/meus-desafios/autodesafio`} />}
                />

                {/* Desafios */}
                <PrivateRouteContainer
                  exact
                  path="/desafios/:type"
                  component={Challenges}
                />
                <PrivateRouteContainer
                  exact
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
                  exact
                  path="/perfil/:action"
                  component={Profile}
                />
                <Route
                  exact
                  path="/perfil"
                  render={() => <Redirect to={`/perfil/pessoal`} />}
                />
                <PrivateRouteContainer
                  exact
                  path="/auth/:type/logout"
                  component={Logout}
                />
                <Route exact path="/auth/:type/:action" component={Auth} />

                <Route path={"/404"} component={NotFound} />
                {/* <Redirect to={`/404`} /> */}
                <Route component={NotFound} />
              </Switch>
            )}
            {usertype === "empresa" && (
              <Switch location={location}>
                {/* Join */}
                <Route exact path="/join/:type/:action" component={Join} />

                {/* Dashboard */}
                <PrivateRouteContainer
                  exact
                  path="/dashboard"
                  component={Dashboard}
                />

                {/* Meus Desafios */}
                <PrivateRouteContainer
                  exact
                  path="/meus-desafios/:type"
                  component={MyChallengesCompany}
                />
                <PrivateRouteContainer
                  exact
                  path="/meus-desafios/:type/:id/:page"
                  component={Challenge}
                />
                <PrivateRouteContainer
                  exact
                  path="/meus-desafios/:type/:id/:page/:trail_type"
                  component={Challenge}
                />

                <PrivateRouteContainer
                  exact
                  path="/meus-desafios/:type/:id/trilha/:trail_type/:trail_id"
                  component={TrilhaWatch}
                />
                {/* <PrivateRouteContainer
                      exact
                      path="/meus-desafios/:type/:id/forum/:forum_id"
                      component={Challenge}
                    /> */}
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
                  render={() => <Redirect to={`/meus-desafios/in_company`} />}
                />

                {/* Novo desafio */}
                <PrivateRouteContainer
                  exact
                  path="/novo-desafio"
                  component={NewChallenge}
                />
                <PrivateRouteContainer
                  exact
                  path="/editar-trilha/:step/:id"
                  component={CreateTrail}
                />
                <PrivateRouteContainer
                  exact
                  path="/editar-trilha/:step/:id"
                  component={CreateTrail}
                />
                <PrivateRouteContainer
                  exact
                  path="/editar-trilha/:step/:id/:type"
                  component={CreateTrail}
                />

                {/* Perfil */}
                <PrivateRouteContainer
                  exact
                  path="/perfil/:action"
                  component={Profile}
                />
                <Route
                  exact
                  path="/perfil"
                  render={() => <Redirect to={`/perfil/pessoal`} />}
                />
                <PrivateRouteContainer
                  exact
                  path="/auth/:type/logout"
                  component={Logout}
                />
                <Route exact path="/auth/:type/:action" component={Auth} />
                <Route path={"/404"} component={NotFound} />
                {/* <Redirect to={`/404`} /> */}
                <Route component={NotFound} />
              </Switch>
            )}
            {(usertype === "mentor" || usertype === "jurado") && (
              <Switch location={location}>
                <Route exact path="/join/:type/:action" component={Join} />

                <PrivateRouteContainer
                  exact
                  path={`/mentor/:action/:id`}
                  component={Judges}
                />
                <PrivateRouteContainer
                  exact
                  path={`/jurado/:action/:id`}
                  component={Judges}
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
                  path="/meus-desafios/:type/:id/:page/:trail_type"
                  component={Challenge}
                />
                <PrivateRouteContainer
                  exact
                  path="/meus-desafios/:type/:id/trilha/:trail_type/:trail_id"
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
                  render={() => <Redirect to={`/meus-desafios/autodesafio`} />}
                />
                <PrivateRouteContainer
                  exact
                  path="/auth/:type/logout"
                  component={Logout}
                />
                <Route exact path="/auth/:type/:action" component={Auth} />
                <Route component={NotFound} />
              </Switch>
            )}
            {/* Projeto */}
            <PrivateRouteContainer
              exact
              path={`/projeto/:id`}
              component={Project}
            />
            {/* <Route component={NotFound} /> */}

            {/* <Redirect from={"*"} to="/404" /> */}
          </>
        )
      ) : (
        <Switch location={location}>
          <PrivateRouteContainer
            exact
            path="/auth/:type/logout"
            component={Logout}
          />
          <Route
            exact
            path="/auth/empresa/login"
            render={() => <Redirect to={`/auth/empresa/email`} />}
          />
          <Route exact path="/auth/:type/:action" component={Auth} />
          {/* Auth */}
          <Route
            exact
            path="/"
            render={({ match }) => <Redirect to={`/auth/talento/login`} />}
          />
          {/* Auth */}
          <Route
            exact
            path="/auth/:type"
            render={({ match }) => <Redirect to={`/auth/talento/login`} />}
          />
          <PrivateRouteContainer
            exact
            path="/auth/:type/logout"
            component={Logout}
          />
          <Route component={NotFound} />
        </Switch>
      )}

      <Route path={["/*/modal/:type/:id"]} children={<ModalPage />} />
    </div>
  );
};

export { RoutesConfig };

import React, { useEffect } from 'react'
import { 
    Router, 
    Switch,
    Route,
    Redirect,
    // useLocation 
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'

import { PrivateRouteContainer } from './PrivateRouteContainer'


import history from 'utils/history'
// import { autoLogin } from 'services/login'

import Auth from 'containers/public/Auth'
// import Join from 'containers/public/Join'

import { Dashboard } from 'containers/private/Dashboard'
import { Profile } from 'containers/private/Profile'
import { Logout } from 'containers/private/Logout'
import { Join } from 'containers/private/Join'

// import { store } from 'store/configureStore'

import { ProvideAuth } from 'utils/context/auth'

const Routes = () => {
    
//     const dispatch = useDispatch()
//   console.log(history)

//   useEffect(() => {
//     dispatch(autoLogin())
//   }, [dispatch])

    return (

        <ProvideAuth>

            <Router history={history}>
                
                <Switch>
                    
                    <Redirect from="/logged" to="/dashboard/talento" />

                    {/* Dashboard */}
                    <PrivateRouteContainer path="/dashboard/:type" component={Dashboard} />

                    {/* Perfil */}
                    <PrivateRouteContainer path="/perfil/:type/:action" component={Profile} />

                    {/* Logout */}
                    <PrivateRouteContainer path="/auth/:type/logout" component={Logout} />

                    {/* signup pos-step */}
                    <Route path="/join/:type/:action" component={ Join } />

                    <Route path="/auth/:type/:action" component={ Auth } />

                    {/* <PrivateRoutes /> */}
                    {/* <PrivateRoutes /> */}
                    
                </Switch>
                
            </Router>

        </ProvideAuth>
    )
}

export {
    Routes
}
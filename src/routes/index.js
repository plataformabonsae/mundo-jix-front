import React, { 
    // useEffect,
    // useState
 } from 'react'
import { 
    Router, 
    Switch,
    Route,
    Redirect,
    // useLocation 
} from 'react-router-dom'
import { useSelector, 
    // useDispatch
 } from 'react-redux'

// import { PrivateRoutes } from './PrivateRoutes'
// import { PublicRoutes } from './PublicRoutes'

// import { PrivateRouteContainer } from './PrivateRouteContainer'


import history from 'utils/history'
// import { autoLogin } from 'services/login'

import Auth from 'containers/public/Auth'
// import Join from 'containers/public/Join'

import { Dashboard } from 'containers/private/Dashboard'
import { Profile } from 'containers/private/Profile'
import { Logout } from 'containers/private/Logout'
import { Join } from 'containers/private/Join'

import { Loading } from 'components/Loading'
// import { Menu } from 'components/Menu'
// import { Header } from 'components/Header'


// import { store } from 'store/configureStore'

import { ProvideAuth } from 'utils/context/auth'
import { PrivateRouteContainer } from './PrivateRouteContainer'

const Routes = () => {

    // const [acceptedTerms, setAcceptedTerms] = useState()
    
    // const dispatch = useDispatch()
//   console.log(history)
    const { data: usertype } = useSelector(state => state.usertype)
    const { data: user, loading } = useSelector(state => state.login)

    // useEffect(() => {
    //     dispatch(autoLogin())
    // }, [dispatch])


    return (

        <ProvideAuth>

            <Router history={history}>
                
                <Switch>

                    <>

                    { loading ? 
                        <Loading text={ 'Carregando...' } />
                        : 
                            user ? (
                                !user?.accepted_terms ? (
                                    <>
                                        {/* Join */}
                                        <Route path="/join/:type/:action" component={Join} />

                                        <Redirect from="/dashboard" to={`/join/${usertype}/terms`} />
                                    </>
                                ) : (
                                <>

                                    {/* Dashboard */}
                                    <PrivateRouteContainer path="/dashboard/:type" component={Dashboard} />

                                    {/* Perfil */}
                                    <PrivateRouteContainer path="/perfil/:type/:action" component={Profile} />


                                    {/* Logout */}
                                    <PrivateRouteContainer path="/auth/:type/logout" component={ Logout } />
                                    
                                    <Redirect from="/join" to={`/dashboard/${usertype}`} />
                                    
                                    {/* <Redirect from="/auth/:type/:action" to={`/dashboard/${usertype}`} /> */}
                                </>
                                )
                            )
                            : (
                                <>

                                    <Route path="/auth/:type/:action" component={ Auth } />
                                    
                                    <Redirect from="*" to="/auth/talento/login" />
                                    <Redirect from="/" to="/auth/talento/login" />
                                </>
                            ) }
                    
                    {/* <Redirect from="/logged" to="/dashboard/talento" /> */}

                    {/* Dashboard */}
                    {/* <PrivateRouteContainer path="/dashboard/:type" component={Dashboard} /> */}

                    {/* Perfil */}
                    {/* <PrivateRouteContainer path="/perfil/:type/:action" component={Profile} /> */}

                    {/* Logout */}
                    {/* <PrivateRouteContainer path="/auth/:type/logout" component={Logout} /> */}

                    {/* signup pos-step */}
                    {/* <PrivateRouteContainer path="/join/:type/:action" component={ Join } /> */}

                    {/* <Route path="/auth/:type/:action" component={ Auth } /> */}
                    
                    </>
                    
                        
                </Switch>
                
            </Router>

        </ProvideAuth>
    )
}

export {
    Routes
}
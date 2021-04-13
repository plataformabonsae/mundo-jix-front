import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, useLocation } from 'react-router-dom'

import { Menu } from 'components/Menu'
import { Header } from 'components/Header'

// import { useAuth } from 'utils/context/auth'

// import { autoLogin } from 'services/login'

export const PrivateRouteContainer = ({ component: Component, ...rest }) => {

    const location = useLocation() 
    const { data: user } = useSelector(state => state.login)

    return (
        <Route {...rest} render={
            props => (  
                user ? (
                    <>
                        <Menu user={ user } />
                        <Header user={ user } />
                        <Component {...props} />
                    </> )
                : (
                    <Redirect
                    to={{
                        pathname: "/auth/talento/login",
                        state: { from: location }
                    }}
                    />
                )
        ) } /> )
    
}

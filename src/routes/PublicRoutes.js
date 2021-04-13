import React from 'react';
import { 
  Route, 
  Redirect, 
  // Router, 
  // Switch 
} from 'react-router-dom'


import Auth from 'containers/public/Auth'
// import NotFound from 'containers/public/404'

// import history from 'utils/history'

const PublicRoutes = () => (  
  <>

    {/* Login, Signup pre-step */}
    <Route path="/auth/:type/:action" component={ Auth } />
    
    {/* notFound */}
    {/* <Route path="/404" component={NotFound} /> */}
    <Redirect exact from="/" to="/auth/talento/login" />
    <Redirect exact from="/404" to="/auth/talento/login" />

  </>
)

export {
  PublicRoutes
}
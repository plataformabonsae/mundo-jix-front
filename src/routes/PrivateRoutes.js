import React, { 
  // useContext, 
  // createContext, 
} from 'react'
import { Route, 
  // Redirect, 
  // Router, 
  // Switch 
} from 'react-router-dom'

// import { PrivateRouteContainer } from './PrivateRouteContainer'

import { Dashboard } from 'containers/private/Dashboard'
import { Profile } from 'containers/private/Profile'
import { Logout } from 'containers/private/Logout'
// import { Join } from 'containers/private/Join'


// import history from 'utils/history'
// import { store } from 'store/configureStore'


const PrivateRoutes = () => {
  
  // let { usertype } = store.getState()
  // let type = usertype.data

  // console.log(type, 'type')
  
  return (
    <>
      {/* Dashboard */}
      <Route path="/dashboard/:type" component={Dashboard} />

      {/* Perfil */}
      <Route path="/perfil/:type/:action" component={Profile} />

      {/* Logout */}
      <Route path="/auth/:type/logout" component={Logout} />

      {/* signup pos-step */}
      {/* <Route path="/join/:type/:action" component={ Join } />

      <Redirect from="/auth" to="/dashboard/talento" />  */}

      {/* <Redirect from="*" to="/dashboard/:type/pessoal" /> */}
      
    </>
  )
}

export {
  PrivateRoutes
}
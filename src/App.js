import React, { 
  useEffect, 
  // useState 
} from 'react'
import { 
  useDispatch, 
  // useSelector,
} from 'react-redux'
// import { useLocation } from 'react-router-dom'

// import { useRoutes } from 'hookrouter'
import { Routes } from 'routes'
import './App.css'

// import { useLocation } from 'react-router'

import history from 'utils/history'

// import { store } from 'store/configureStore'
import { autoLogin } from 'services/login'
// import { useAuth } from 'utils/context/auth'


const App = () => {
  
  // const location = useLocation()
  // console.log(location)
  // const [hasUser, setHasUser] = useState()
  // const auth = useAuth()
  // const user = useSelector(state => state.login)
  
  const dispatch = useDispatch()
  // dispatch(autoLogin())
  // console.log(auth)
  // console.log(user)
  // auth.setAuth(hasUser)

  useEffect(() => {
    dispatch(autoLogin())
    // console.log(history)
    // setHasUser(user)
  }, [dispatch])

  return <Routes />
}

export default App

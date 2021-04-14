// Imports: Dependencies
import {combineReducers} from 'redux';

// Imports: Reducers
import auth from './Auth'
import login from './Login'
import token from './Token'
import usertype from './UserType'
import dashboard from './Dashboard'
import profile from './Profile'

const ducks = combineReducers({
  auth,
  login,
  token,
  usertype,
  dashboard,
  profile
})


// Redux: Root Reducer
export default ducks

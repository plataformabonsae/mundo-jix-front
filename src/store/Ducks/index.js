// Imports: Dependencies
import {combineReducers} from 'redux';

// Imports: Reducers
import auth from './Auth'
import login from './Login'
import token from './Token'
import usertype from './UserType'
import dashboard from './Dashboard'


// Redux: Root Reducer
export default combineReducers({
  auth,
  login,
  token,
  usertype,
  dashboard
});

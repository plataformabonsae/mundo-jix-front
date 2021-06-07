// Imports: Dependencies
import { combineReducers } from "redux";

// Imports: Reducers
import auth from "./Auth";
import user, { Types } from "./User";
import token from "./Token";
import usertype from "./UserType";
import dashboard from "./Dashboard";
import profile from "./Profile";
import challenges from "./Challenges";
import challenge from "./Challenge";
import team from "./Team";
import subscribeChallenge from "./SubscribeChallenge";
import myChallenges from "./MyChallenges";
import project from "./Project";
import cep from "./Cep";
import recover from "./Recover";
import terms from "./Terms";

const ducks = combineReducers({
  auth,
  user,
  token,
  usertype,
  dashboard,
  profile,
  cep,
  challenges,
  challenge,
  team,
  myChallenges,
  project,
  subscribeChallenge,
  recover,
  terms,
});

const rootReducer = (state, action) => {
  if (action.type === Types.LOGOUT_SUCCESS) {
    window.localStorage.clear();
    return ducks(undefined, action);
  }

  return ducks(state, action);
};

// Redux: Root Reducer
export { rootReducer };

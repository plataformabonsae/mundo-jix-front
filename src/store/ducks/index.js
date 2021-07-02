// Imports: Dependencies
import { combineReducers } from "redux";

// Imports: Reducers
import auth from "./Auth";
import user, { Types } from "./User";
import token from "./Token";
import tokenExternal from "./TokenExternal";
import usertype from "./UserType";
import dashboard from "./Dashboard";
import profile from "./Profile";
import challenges from "./Challenges";
import feedbacks from "./Feedbacks";
import challenge from "./Challenge";
import team from "./Team";
import subscribeChallenge from "./SubscribeChallenge";
import myChallenges from "./MyChallenges";
import project from "./Project";
import projects from "./Projects";
import cep from "./Cep";
import recover from "./Recover";
import terms from "./Terms";
import trail from "./Trail";
import forum from "./Forum";
import notifications from "./Notifications";
import invites from "./Invites";
import users from "./Users";
import newChallenge from "./NewChallenge";
import skills from "./Skills";
import deleteMaterial from "./DeleteMaterial";
import payment from "./Payment";
import assessment from "./Assessment";

const ducks = combineReducers({
  auth,
  user,
  token,
  tokenExternal,
  usertype,
  dashboard,
  profile,
  cep,
  challenges,
  challenge,
  team,
  myChallenges,
  project,
  projects,
  subscribeChallenge,
  recover,
  terms,
  trail,
  notifications,
  invites,
  forum,
  feedbacks,
  users,
  newChallenge,
  skills,
  deleteMaterial,
  payment,
  assessment,
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

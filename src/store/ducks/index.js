// Imports: Dependencies
import { combineReducers } from "redux";

// Imports: Reducers
import auth from "./Auth";
import user from "./User";
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
});

// Redux: Root Reducer
export { ducks };

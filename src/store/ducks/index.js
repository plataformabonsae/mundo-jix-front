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
import myChallenges from "./MyChallenges";
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
  myChallenges,
});

// Redux: Root Reducer
export { ducks };

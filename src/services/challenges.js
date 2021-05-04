import { Creators as ChallengesActions } from "store/ducks/Challenges";
import { Creators as MyChallengesActions } from "store/ducks/MyChallenges";

import { TALENT, COMPANY } from "utils/api";
import axios from "axios";

export const my = (
  type = "talento",
  token = window.localStorage.getItem("token"),
  url = type === "empresa"
    ? COMPANY.CHALLENGES.my_challenges
    : TALENT.CHALLENGES.my_challenges
) => async (dispatch) => {
  dispatch(MyChallengesActions.myChallengesRequest());
  const res = axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  await res
    .then((response) =>
      dispatch(
        MyChallengesActions.myChallengesSuccess(
          response?.data?.data?.challenges
        )
      )
    )
    .catch((error) => dispatch(MyChallengesActions.myChallengesFailure(error)));
};

export const all = (
  type = "talento",
  token = window.localStorage.getItem("token"),
  url = type === "empresa"
    ? COMPANY.CHALLENGES.challenges
    : TALENT.CHALLENGES.challenges
) => async (dispatch) => {
  dispatch(ChallengesActions.challengesRequest());
  const res = axios({
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  await res
    .then((response) =>
      dispatch(
        ChallengesActions.challengesSuccess(response?.data?.data?.challenges)
      )
    )
    .catch((error) => dispatch(ChallengesActions.challengesFailure(error)));
};

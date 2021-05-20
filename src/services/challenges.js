import { Creators as ChallengesActions } from "store/ducks/Challenges";
import { Creators as ChallengeActions } from "store/ducks/Challenge";
import { Creators as MyChallengesActions } from "store/ducks/MyChallenges";
import { Creators as SubscribeChallengeActions } from "store/ducks/SubscribeChallenge";

import { TALENT, COMPANY } from "utils/api";
import axios from "axios";

export const my =
  (
    type = "talento",
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.CHALLENGES.my_challenges
      : TALENT.CHALLENGES.my_challenges
  ) =>
  async (dispatch) => {
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
      .catch((error) =>
        dispatch(MyChallengesActions.myChallengesFailure(error))
      );
  };

export const all =
  (
    type = "talento",
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.CHALLENGES.challenges
      : TALENT.CHALLENGES.challenges
  ) =>
  async (dispatch) => {
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

export const get =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.CHALLENGES.challenge
      : TALENT.CHALLENGES.challenge
  ) =>
  async (dispatch) => {
    dispatch(ChallengeActions.challengeSuccess());
    const res = axios({
      url: url(body.challenge_id),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(ChallengeActions.challengeSuccess(response?.data?.data))
      )
      .catch((error) => dispatch(ChallengeActions.challengeFailure(error)));
    return res;
  };

export const subscribe =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.CHALLENGES.subscribe
      : TALENT.CHALLENGES.subscribe
  ) =>
  async (dispatch) => {
    dispatch(SubscribeChallengeActions.subscribeChallengeRequest());
    const formData = new FormData();
    for (var key in body) {
      formData.append(key, body[key]);
      console.log(key, body[key]);
    }
    console.log(body);
    const res = axios({
      url: url(body.challenge_id),
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "multipart/form-data",
      },
      data: body,
    });
    await res
      .then((response) =>
        dispatch(
          SubscribeChallengeActions.subscribeChallengeSuccess(response?.data)
        )
      )
      .catch((error) =>
        dispatch(SubscribeChallengeActions.subscribeChallengeFailure(error))
      );
    return await res;
  };

import { Creators as ChallengesActions } from "store/ducks/Challenges";
import { Creators as ChallengeActions } from "store/ducks/Challenge";
import { Creators as MyChallengesActions } from "store/ducks/MyChallenges";
import { Creators as SubscribeChallengeActions } from "store/ducks/SubscribeChallenge";

import { TALENT, COMPANY } from "utils/api";
import axios from "axios";

export const create =
  (
    type = "empresa",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.CHALLENGE.create
      : TALENT.CHALLENGES.my_challenges
  ) =>
  async (dispatch) => {
    dispatch(MyChallengesActions.myChallengesRequest());
    const formData = new FormData();
    for (var key in body) {
      if (typeof key === "object") {
        formData.append(key, JSON.stringify(body[key]));
      } else {
        formData.append(key, body[key]);
      }
    }
    const res = axios({
      url,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    await res
      .then((response) =>
        dispatch(MyChallengesActions.myChallengesSuccess(response))
      )
      .catch((error) =>
        dispatch(MyChallengesActions.myChallengesFailure(error))
      );
    return res;
  };

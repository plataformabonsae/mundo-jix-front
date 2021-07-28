import { Creators as NewChallengeActions } from "store/ducks/NewChallenge";

import { TALENT, COMPANY } from "utils/api";
import axios from "axios";

export const createChallenge =
  (
    type = "empresa",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.CHALLENGES.create
      : TALENT.CHALLENGES.my_challenges
  ) =>
  async (dispatch) => {
    dispatch(NewChallengeActions.newChallengeRequest());
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
        dispatch(NewChallengeActions.newChallengeSuccess(response?.data?.data))
      )
      .catch(function (error) {
        dispatch(NewChallengeActions.newChallengeFailure(error));
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
    return res;
  };

export const updateChallenge =
  (
    type = "empresa",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.CHALLENGES.update
      : TALENT.CHALLENGES.my_challenges
  ) =>
  async (dispatch) => {
    dispatch(NewChallengeActions.updateChallengeRequest());
    const formData = new FormData();
    for (var key in body) {
      if (typeof key === "object") {
        formData.append(key, JSON.stringify(body[key]));
      } else {
        formData.append(key, body[key]);
      }
    }
    const res = axios({
      url: url(body.challenge_id),
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    await res
      .then((response) =>
        dispatch(
          NewChallengeActions.updateChallengeSuccess(response?.data?.data)
        )
      )
      .catch(function (error) {
        dispatch(NewChallengeActions.updateChallengeFailure(error));
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
    return res;
  };

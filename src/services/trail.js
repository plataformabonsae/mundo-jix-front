import { Creators as TrailActions } from "store/ducks/Trail";
import { TALENT, COMPANY } from "utils/api";
import axios from "axios";

export const normal =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.TRAIL.normal : TALENT.TRAIL.normal
  ) =>
  async (dispatch) => {
    dispatch(TrailActions.trailRequest());
    const res = axios({
      url: url(body.challenge_id),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(TrailActions.trailSuccess(response?.data?.data?.trail))
      )
      .catch((error) => dispatch(TrailActions.trailFailure(error)));
    return res;
  };

export const premium =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.TRAIL.premium : TALENT.TRAIL.premium
  ) =>
  async (dispatch) => {
    dispatch(TrailActions.trailRequest());
    const res = axios({
      url: url(body.challenge_id),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(TrailActions.trailSuccess(response?.data?.data?.trail))
      )
      .catch((error) => dispatch(TrailActions.trailFailure(error)));
    return res;
  };

export const question =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.TRAIL.question : TALENT.TRAIL.question
  ) =>
  async (dispatch) => {
    dispatch(TrailActions.trailCurrentRequest());
    const res = axios({
      url: url(body.id, body.type),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(TrailActions.trailCurrentSuccess(response?.data?.data))
      )
      .catch((error) => dispatch(TrailActions.trailCurrentFailure(error)));
    return res;
  };

export const video =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.TRAIL.video : TALENT.TRAIL.video
  ) =>
  async (dispatch) => {
    dispatch(TrailActions.trailCurrentRequest());
    const res = axios({
      url: url(body.id, body.type),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(TrailActions.trailCurrentSuccess(response?.data?.data))
      )
      .catch((error) => dispatch(TrailActions.trailCurrentFailure(error)));
    return res;
  };

export const material =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.TRAIL.material : TALENT.TRAIL.material
  ) =>
  async (dispatch) => {
    dispatch(TrailActions.trailCurrentRequest());
    const res = axios({
      url: url(body.id, body.type),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(TrailActions.trailCurrentSuccess(response?.data?.data))
      )
      .catch((error) => dispatch(TrailActions.trailCurrentFailure(error)));
    return res;
  };

export const answer =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.TRAIL.answer : TALENT.TRAIL.answer
  ) =>
  async (dispatch) => {
    // dispatch(TrailActions.trailCurrentRequest());
    const res = axios({
      url: url(body.id, body.answer_id),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then
      // (response) =>
      // dispatch(TrailActions.trailCurrentSuccess(response?.data?.data))
      ()
      .catch((error) => dispatch(TrailActions.trailCurrentFailure(error)));
    return res;
  };

import { Creators as CreateTrail } from "store/ducks/CreateTrail";
import { TALENT, COMPANY } from "utils/api";
import axios from "axios";

export const question =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.TRAIL.createQuestion
      : TALENT.TRAIL.createQuestion
  ) =>
  async (dispatch) => {
    const formData = new FormData();
    for (var key in body) {
      if (typeof key === "object") {
        formData.append(key, JSON.stringify(body[key]));
      } else {
        formData.append(key, body[key]);
      }
    }
    dispatch(CreateTrail.createTrailRequest());
    const res = axios({
      url: url(body.challenge_id),
      data: formData,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(CreateTrail.createTrailSuccess(response?.data?.data))
      )
      .catch((error) => dispatch(CreateTrail.createTrailFailure(error)));
    return res;
  };

export const video =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.TRAIL.createVideo
      : TALENT.TRAIL.createVideo
  ) =>
  async (dispatch) => {
    const formData = new FormData();
    for (var key in body) {
      if (typeof key === "object") {
        formData.append(key, JSON.stringify(body[key]));
      } else {
        formData.append(key, body[key]);
      }
    }
    dispatch(CreateTrail.createTrailRequest());
    const res = axios({
      url: url(body.challenge_id),
      method: "post",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(CreateTrail.createTrailSuccess(response?.data?.data))
      )
      .catch((error) => dispatch(CreateTrail.createTrailFailure(error)));
    return res;
  };

export const material =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.TRAIL.createMaterial
      : TALENT.TRAIL.createMaterial
  ) =>
  async (dispatch) => {
    const formData = new FormData();
    for (var key in body) {
      if (typeof key === "object") {
        formData.append(key, JSON.stringify(body[key]));
      } else {
        formData.append(key, body[key]);
      }
    }
    dispatch(CreateTrail.createTrailRequest());
    const res = axios({
      url: url(body.challenge_id),
      method: "post",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(CreateTrail.createTrailSuccess(response?.data?.data))
      )
      .catch((error) => dispatch(CreateTrail.createTrailFailure(error)));
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
    // dispatch(CreateTrail.createTrailRequest());
    const res = axios({
      url: url(body.challenge_id),
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then
      // (response) =>
      // dispatch(CreateTrail.createTrailSuccess(response?.data?.data))
      ()
      .catch((error) => dispatch(CreateTrail.createTrailFailure(error)));
    return res;
  };

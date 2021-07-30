import { Creators as CreateTrail } from "store/ducks/CreateTrail";
import { TALENT, COMPANY } from "utils/api";
import axios from "axios";

export const get =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = COMPANY.TRAIL.get
  ) =>
  async (dispatch) => {
    dispatch(CreateTrail.getTrailRequest());
    const res = axios({
      url: url(body.challenge_id),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(CreateTrail.getTrailSuccess(response?.data?.data))
      )
      .catch((error) => dispatch(CreateTrail.getTrailFailure(error)));
    return res;
  };

export const deleteTrail =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = COMPANY.TRAIL.delete
  ) =>
  async (dispatch) => {
    // dispatch(CreateTrail.getTrailRequest());
    const res = axios({
      url: url(body.trail_id),
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res;
    // .then((response) =>
    //   dispatch(CreateTrail.getTrailSuccess(response?.data?.data))
    // )
    // .catch((error) => dispatch(CreateTrail.getTrailFailure(error)));
    return res;
  };

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

export const updateQuestion =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = COMPANY.TRAIL.updateQuestion
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
      url: url(body.challenge_id, body.trail_id),
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

export const updateVideo =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.TRAIL.updateVideo
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
      url: url(body.challenge_id, body.trail_id),
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

export const updateMaterial =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.TRAIL.updateMaterial
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
      url: url(body.challenge_id, body.trail_id),
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

export const up =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.TRAIL.up : TALENT.TRAIL.up
  ) =>
  async (dispatch) => {
    // dispatch(CreateTrail.createTrailRequest());
    const res = axios({
      url: url(body.trail_id),
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then(
        // (response) =>
        // dispatch(CreateTrail.createTrailSuccess(response?.data?.data))
        (res) => console.log(res)
      )
      .catch((error) => {
        dispatch(CreateTrail.createTrailFailure(error));
        console.log(error);
      });
    return res;
  };

export const down =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.TRAIL.down : TALENT.TRAIL.down
  ) =>
  async (dispatch) => {
    // dispatch(CreateTrail.createTrailRequest());
    const res = axios({
      url: url(body.trail_id),
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    console.log(body);
    await res
      .then(
        // (response) =>
        // dispatch(CreateTrail.createTrailSuccess(response?.data?.data))
        (res) => console.log(res)
      )
      .catch((error) => {
        dispatch(CreateTrail.createTrailFailure(error));
        console.log(error);
      });
    return res;
  };

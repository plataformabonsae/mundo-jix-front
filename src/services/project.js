import { Creators as ProjectActions } from "store/ducks/Project";

import { TALENT, COMPANY } from "utils/api";
import axios from "axios";

export const get =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.PROJECT.project : TALENT.PROJECT.project
  ) =>
  async (dispatch) => {
    dispatch(ProjectActions.projectRequest());
    const res = axios({
      url: url(body.challenge_id),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(ProjectActions.projectSuccess(response?.data?.data))
      )
      .catch((error) => dispatch(ProjectActions.projectFailure(error)));
    return res;
  };

export const post =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.PROJECT.store : TALENT.PROJECT.store
  ) =>
  async (dispatch) => {
    dispatch(ProjectActions.projectRequest());
    const formData = new FormData();
    for (var key in body) {
      formData.append(key, body[key]);
    }
    const res = axios({
      url,
      method: "post",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    await res
      .then((response) =>
        dispatch(ProjectActions.projectSuccess(response?.data?.data))
      )
      .catch((error) => dispatch(ProjectActions.projectFailure(error)));
    return res;
  };

export const update =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.PROJECT.update : TALENT.PROJECT.update
  ) =>
  async (dispatch) => {
    dispatch(ProjectActions.projectSuccess());
    const formData = new FormData();
    for (var key in body) {
      formData.append(key, body[key]);
      console.log(formData.values());
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
        dispatch(ProjectActions.projectSuccess(response?.data?.data))
      )
      .catch((error) => dispatch(ProjectActions.projectFailure(error)));
    return res;
  };

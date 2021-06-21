import { Creators as NotificationsActions } from "store/ducks/Notifications";

import { TALENT, COMPANY } from "utils/api";
import axios from "axios";

export const all =
  (
    type = "talento",
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.NOTIFICATIONS.all
      : TALENT.NOTIFICATIONS.all
  ) =>
  async (dispatch) => {
    dispatch(NotificationsActions.notificationsRequest());
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
          NotificationsActions.notificationsSuccess(response?.data?.data)
        )
      )
      .catch((error) =>
        dispatch(NotificationsActions.notificationsFailure(error))
      );
    return res;
  };

export const unread =
  (
    type = "talento",
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.NOTIFICATIONS.unread
      : TALENT.NOTIFICATIONS.unread
  ) =>
  async (dispatch) => {
    dispatch(NotificationsActions.notificationsRequest());
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
          NotificationsActions.notificationsSuccess(response?.data?.data)
        )
      )
      .catch((error) =>
        dispatch(NotificationsActions.notificationsFailure(error))
      );
    return res;
  };

export const readAll =
  (
    type = "talento",
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.NOTIFICATIONS.readAll
      : TALENT.NOTIFICATIONS.readAll
  ) =>
  async (dispatch) => {
    dispatch(NotificationsActions.notificationsRequest());
    const res = axios({
      url,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    await res
      .then((response) =>
        dispatch(
          NotificationsActions.notificationsSuccess(response?.data?.data)
        )
      )
      .catch((error) =>
        dispatch(NotificationsActions.notificationsFailure(error))
      );
    return res;
  };

export const readOne =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.NOTIFICATIONS.readOne
      : TALENT.NOTIFICATIONS.readOne
  ) =>
  async (dispatch) => {
    dispatch(NotificationsActions.notificationsRequest());
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
        dispatch(
          NotificationsActions.notificationsSuccess(response?.data?.data)
        )
      )
      .catch((error) =>
        dispatch(NotificationsActions.notificationsFailure(error))
      );
    return res;
  };

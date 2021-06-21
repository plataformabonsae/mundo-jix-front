import { Creators as TokenActions } from "store/ducks/Token";
import { Creators as UserActions } from "store/ducks/User";
// import { Creators as ProfileActions } from "store/ducks/Profile";
import { TALENT, COMPANY } from "utils/api";
import { loginFetch } from "services/login";
import { tokenFetch, tokenFetchExternal } from "services/token";
// import { useSelector } from "react-redux";
import axios from "axios";

export const get =
  (
    type = "talento",
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.AUTH.user : TALENT.AUTH.user
  ) =>
  async (dispatch) => {
    // dispatch(UserActions.userUpdate());
    const res = axios({
      url,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await dispatch(UserActions.userUpdate());
    await res.then(function (response) {
      if (response.data.success) {
        dispatch(UserActions.userSuccess(response.data.data));
      }
      console.log(response);
    });
    //   .catch(function (response) {
    //     //handle error
    //     // console.log(response.message);
    //     // dispatch(UserActions.userFailure(response));
    //   });
    return res;
  };

export const login = (type, user) => async (dispatch) => {
  const { token } = await dispatch(tokenFetch(type, user));
  if (token && type) {
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("usertype", type);
    await dispatch(loginFetch(type, token));
  }
};

export const loginExternal = (type, user) => async (dispatch) => {
  const data = await dispatch(tokenFetchExternal(type, user));
  console.log(user);
  const token = data?.data?.data?.token;
  if (token && type) {
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("usertype", type);
    await dispatch(loginFetch(type, token));
  }
};

export const newuser =
  (
    type,
    body,
    url = type === `talento` ? TALENT.AUTH.register : COMPANY.AUTH.register
  ) =>
  async (dispatch) => {
    return dispatch(tokenFetch(type, body, url)).then((res) =>
      dispatch(loginFetch(type, res.data.data.token))
    );
  };

export const edit =
  (
    type,
    body,
    url = type === "empresa" ? COMPANY.AUTH.update : TALENT.AUTH.update
  ) =>
  async (dispatch) => {
    const token = window.localStorage.getItem("token");
    await dispatch(editFetch(type, body, url, token));
  };

export const editFetch =
  (
    type = `talento`,
    body,
    url = (type = `empresa` ? COMPANY.AUTH.update : TALENT.AUTH.update),
    token
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
    // Display the key/value pairs
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    // dispatch(UserActions.userUpdate());
    const res = axios({
      url,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    await res.then(function (response) {
      dispatch(get(type, token));
    });
    //   .catch(function (response) {
    //     //handle error
    //     // dispatch(UserActions.userFailure(response));
    //   });
    return res;
    // console.log(res);
    // console.log(body);
    // console.log(token);
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": `multipart/form-data`,
    //     Host: `${document.location.origin}`,
    //     Authorization: `Bearer ${token}`,
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(body),
    // });
    // const { ok } = response;
    // if (ok) dispatch(ProfileActions.profileSuccess());
    // else dispatch(ProfileActions.profileFailure("error"));
  };

import { Creators as TokenActions } from "store/ducks/Token";
import { Creators as UserActions } from "store/ducks/User";
// import { Creators as ProfileActions } from "store/ducks/Profile";
import { TALENT, COMPANY } from "utils/api";
import { loginFetch } from "services/login";
import { tokenFetch } from "services/token";
// import { useSelector } from "react-redux";
import axios from "axios";

export const login = (type, user) => async (dispatch) => {
  const { token } = await dispatch(tokenFetch(type, user));
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
    try {
      const res = await dispatch(tokenFetch(type, body, url));
      if (res?.data?.data?.token && type) {
        window.localStorage.setItem("token", res.data.data.token);
        window.localStorage.setItem("usertype", type);
        await dispatch(loginFetch(type, res.data.data.token));
      }
    } catch (error) {
      dispatch(TokenActions.tokenFailure(error));
    }
  };

export const edit =
  (
    type,
    body,
    url = type === "empresa" ? COMPANY.AUTH.update : TALENT.AUTH.update
  ) =>
  async (dispatch) => {
    const token = window.localStorage.getItem("token");
    try {
      await dispatch(editFetch(type, body, url, token));
    } catch (error) {
      dispatch(UserActions.userFailure(error));
    }
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
      formData.append(key, body[key]);
      console.log(formData.values());
    }
    dispatch(UserActions.userUpdate());
    const res = axios({
      url,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    await res
      .then(function (response) {
        dispatch(UserActions.userSuccess(response.data.data.user));
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response.data.data);
        dispatch(UserActions.userFailure(response));
      });
    console.log(res);
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

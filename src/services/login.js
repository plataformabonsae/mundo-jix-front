import { Creators as UserActions } from "store/ducks/User";
import { TALENT, COMPANY } from "utils/api";

import { store } from "store/configureStore";
import axios from "axios";
import { tokenFetch } from "services/token";
import { get } from "services/auth";

// import { useAuth } from 'utils/context/auth'

// import history from "utils/history";

export const login = (type, user) => async (dispatch) => {
  // const auth = useAuth()
  const res = await dispatch(tokenFetch(type, user));
  if (res.data.data.token && type) {
    console.log("logou");
    window.localStorage.setItem("token", res.data.data.token);
    window.localStorage.setItem("usertype", type);
    const response = await dispatch(loginFetch(type, res.data.data.token));
    return response;
  }
  return res;
};

export const logout = () => async (dispatch) => {
  // const auth = useAuth()
  await dispatch(logoutFetch());
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("usertype");
  window.localStorage.removeItem("accepted_terms");
};

export const autoLogin = (from) => async (dispatch, getState) => {
  // const auth = useAuth()
  const { token, usertype } = store.getState();
  // return new Promise((resolve, reject) => )
  const data = await dispatch(loginFetch(usertype?.data, token?.data));
  return data;
};

export const loginFetch =
  (
    type = "talento",
    token,
    url = type === `empresa` ? COMPANY.AUTH.user : TALENT.AUTH.user
  ) =>
  async (dispatch) => {
    dispatch(UserActions.userRequest());
    const res = axios({
      url,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await res.then(function (response) {
      const user = response?.data?.data;
      dispatch(get(type, token));
      window.localStorage.setItem("accepted_terms", user?.user?.accepted_terms);
    });
    // .catch(function (response) {
    //   //handle error
    //   console.log(response.data.data.data);
    //   dispatch(UserActions.userFailure(response));
    // });
    return res;
    // try {
    //   dispatch(UserActions.userRequest());
    //   const response = await fetch(url, {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       Accept: "application/json",
    //     },
    //   });
    //   const { data } = await response.json();
    //   dispatch(UserActions.userSuccess(data));
    //   return data;
    // } catch (error) {
    //   dispatch(UserActions.userFailure(error));
    //   dispatch(logout());
    // }

    // remember_me:
  };

export const logoutFetch =
  (
    type = window.localStorage.getItem("talento"),
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.AUTH.logout : TALENT.AUTH.logout
  ) =>
  async (dispatch) => {
    dispatch(UserActions.logoutRequest());
    const res = axios({
      url,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await res
      .then((response) => {
        dispatch(UserActions.logoutSuccess());
      })
      .catch((error) => {
        dispatch(UserActions.logoutFailure(error));
        throw new Error(error, "Erro no logout");
      });
  };

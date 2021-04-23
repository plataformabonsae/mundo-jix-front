import { Creators as LoginActions } from "store/ducks/Login";
import { TALENT, COMPANY } from "utils/api";

import { store } from "store/configureStore";

import { tokenFetch } from "services/token";

// import { useAuth } from 'utils/context/auth'

import history from "utils/history";

export const login = (type, user) => async (dispatch) => {
  // const auth = useAuth()
  const { token } = await dispatch(tokenFetch(type, user));
  if (token && type) {
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("usertype", type);
    const data = await dispatch(loginFetch(type, token));
    return data;
  }
};

export const logout = () => async (dispatch) => {
  // const auth = useAuth()
  await dispatch(logoutFetch());
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("usertype");
};

export const autoLogin = (from) => async (dispatch, getState) => {
  // const auth = useAuth()
  const { token, usertype } = store.getState();
  if (token?.data && usertype?.data) {
    const data = await dispatch(loginFetch(usertype.data, token.data));
    from && history.replace(from);
    //   auth?.setAuth(data)
    if (!data) dispatch(logout());
  }
};

export const loginFetch = (
  type = "talento",
  token,
  url = TALENT.AUTH.user
) => async (dispatch) => {
  if (type === `empresa`) url = COMPANY.AUTH.user;
  try {
    dispatch(LoginActions.loginRequest());
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const { data } = await response.json();
    dispatch(LoginActions.loginSuccess(data));
    return data;
  } catch (error) {
    dispatch(LoginActions.loginFailure(error));
    dispatch(logout());
  }
};

export const logoutFetch = (type, token, url = TALENT.AUTH.logout) => async (
  dispatch
) => {
  if (type === `empresa`) url = COMPANY.AUTH.logout;
  try {
    dispatch(LoginActions.logoutRequest());
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    dispatch(LoginActions.logoutSuccess());
  } catch (error) {
    dispatch(LoginActions.logoutFailure(error));
  }
};

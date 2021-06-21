import { Creators as TokenActions } from "store/ducks/Token";
import { Creators as TokenExternalActions } from "store/ducks/TokenExternal";
import { Creators as UserTypeActions } from "store/ducks/UserType";
import { TALENT, COMPANY } from "utils/api";
import axios from "axios";

export const tokenFetch =
  (
    type = `talento`,
    body,
    url = type === `empresa` ? COMPANY.AUTH.login : TALENT.AUTH.login
  ) =>
  async (dispatch) => {
    dispatch(TokenActions.tokenRequest());
    const call = axios({
      url,
      method: "post",
      data: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });
    await call
      .then(function (response) {
        dispatch(UserTypeActions.userTypeSuccess(type));
        dispatch(TokenActions.tokenSuccess(response?.data?.data?.token));
        if (response?.data?.data?.token && type) {
          window.localStorage.setItem("token", response.data.data.token);
          window.localStorage.setItem("usertype", type);
        }
      })
      .catch(function (error) {
        // handle error
        dispatch(TokenActions.tokenFailure(error.response)) &&
          dispatch(UserTypeActions.userTypeFailure(error));
        // console.log(response);
      });
    return call;

    // try {
    //   dispatch(UserTypeActions.userTypeRequest());
    //   dispatch(TokenActions.tokenRequest());
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "*/*",
    //     },
    //     body: JSON.stringify(body),
    //   });
    //   const { success, data } = await response.json();
    //   success &&
    //     dispatch(UserTypeActions.userTypeSuccess(type)) &&
    //     dispatch(TokenActions.tokenSuccess(data?.token)) &&
    //     console.log(data?.token);
    //   !success &&
    //     dispatch(TokenActions.tokenFailure(data)) &&
    //     dispatch(UserTypeActions.userTypeFailure(data));
    //   return data;
    // } catch (error) {
    //   dispatch(TokenActions.tokenFailure(error)) &&
    //     dispatch(UserTypeActions.userTypeFailure(error));
    // }
  };

export const tokenFetchExternal =
  (
    type = `talento`,
    body,
    url = type === `empresa`
      ? COMPANY.AUTH.loginExternal
      : TALENT.AUTH.loginExternal
  ) =>
  async (dispatch) => {
    dispatch(TokenActions.tokenRequest());
    const call = axios({
      url,
      method: "post",
      data: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });
    await call
      .then(function (response) {
        dispatch(UserTypeActions.userTypeSuccess(type));
        // console.log(response, "login external");
        dispatch(TokenActions.tokenSuccess(response?.data?.data?.token));
        if (response?.data?.data?.token && type) {
          window.localStorage.setItem("token", response.data.data.token);
          window.localStorage.setItem("usertype", type);
        }
      })
      .catch(function (error) {
        // handle error
        dispatch(TokenExternalActions.tokenExternalFailure(error)) &&
          dispatch(TokenExternalActions.userTypeFailure(error));
        // console.log(response);
      });
    return call;
  };

export const tokenReset = () => async (dispatch) => {
  try {
    dispatch(TokenActions.tokenRequest());
    dispatch(UserTypeActions.userTypeRequest());
    dispatch(TokenActions.tokenSuccess());
    dispatch(UserTypeActions.userTypeSuccess());
  } catch (error) {
    dispatch(TokenActions.tokenFailure(error));
    dispatch(UserTypeActions.userTypeFailyre(error));
  }
};

import { Creators as TokenActions } from "store/ducks/Token";
import { Creators as UserTypeActions } from "store/ducks/UserType";
import { TALENT, COMPANY } from "utils/api";
import axios from "axios";

export const tokenFetch = (
  type = `talento`,
  body,
  url = type === `empresa` ? COMPANY.AUTH.login : TALENT.AUTH.login
) => async (dispatch) => {
  try {
    // axios
    // dispatch(TokenActions.tokenRequest());
    // const formData = new FormData();
    // for (var key in body) {
    //   formData.append(key, body[key]);
    //   console.log(key, body[key]);
    // }
    // const call = await axios({
    //   url,
    //   method: "post",
    //   data: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    //   .then(function (response) {
    //     // dispatch(UserTypeActions.userTypeSuccess(type));
    //     // dispatch(TokenActions.tokenSuccess(response?.data.token));
    //     console.log(response);
    //   })
    //   .catch(function (response) {
    //     //handle error
    //     // dispatch(TokenActions.tokenFailure(response)) &&
    //     //   dispatch(UserTypeActions.userTypeFailure(response));
    //     console.log(response);
    //   });

    dispatch(UserTypeActions.userTypeRequest());
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(body),
    });
    const { success, data } = await response.json();
    success &&
      dispatch(UserTypeActions.userTypeSuccess(type)) &&
      dispatch(TokenActions.tokenSuccess(data.token));
    !success &&
      dispatch(TokenActions.tokenFailure(data)) &&
      dispatch(UserTypeActions.userTypeFailure(data));
    return data;
  } catch (error) {
    dispatch(TokenActions.tokenFailure(error)) &&
      dispatch(UserTypeActions.userTypeFailure(error));
  }
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

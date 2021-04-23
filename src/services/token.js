import { Creators as TokenActions } from "store/ducks/Token";
import { Creators as UserTypeActions } from "store/ducks/UserType";
import { TALENT, COMPANY } from "utils/api";

export const tokenFetch = (
  type = `talento`,
  body,
  url = type === `talento` ? TALENT.AUTH.login : COMPANY.AUTH.login
) => async (dispatch) => {
  try {
    dispatch(TokenActions.tokenRequest());
    console.log(body, `body TokenFetch`);
    // dispatch(UserTypeActions.userTypeRequest())
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(body),
    });
    console.log(body, "body tokenFetch");
    console.log(response, "response tokenFetch");
    const { success, data } = await response.json();
    console.log(data, `response TokenFetch`);
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

import { TALENT, COMPANY } from "utils/api";
import { Creators as TermsActions } from "store/ducks/Terms";
import axios from "axios";

export const getTerms =
  (
    type = "talento",
    url = type === "empresa" ? COMPANY.TERMS.terms : TALENT.TERMS.terms
  ) =>
  async (dispatch) => {
    dispatch(TermsActions.termsRequest());
    const res = axios({
      url,
      headers: {
        Accept: "application/json",
      },
    });
    await res
      .then((response) => dispatch(TermsActions.termsSuccess(response)))
      .catch((error) => dispatch(TermsActions.termsFailure(error)));
    return res;
    return res;
  };

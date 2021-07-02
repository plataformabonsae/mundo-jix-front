import { Creators as AssessmentActions } from "store/ducks/Assessment";

import { TALENT, COMPANY } from "utils/api";
import axios from "axios";

export const get =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.PROJECT.assessment
      : TALENT.PROJECT.assessment
  ) =>
  async (dispatch) => {
    dispatch(AssessmentActions.assessmentRequest());
    const res = axios({
      url: url(body.project_id),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(AssessmentActions.assessmentSuccess(response?.data?.data))
      )
      .catch((error) => dispatch(AssessmentActions.assessmentFailure(error)));
    return res;
  };

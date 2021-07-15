import { COMPANY } from "utils/api";
import axios from "axios";
import { Creators as SkillsActions } from "store/ducks/Skills";

export const skills =
  (token = window.localStorage.getItem("token"), url = COMPANY.SKILLS.skills) =>
  async (dispatch) => {
    dispatch(SkillsActions.skillsRequest());
    const req = axios({
      url,
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    await req
      .then((response) =>
        dispatch(SkillsActions.skillsSuccess(response?.data?.data))
      )
      .catch((err) => dispatch(SkillsActions.skillsFailure(err)));
    return req;
  };

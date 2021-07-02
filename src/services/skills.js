import { COMPANY } from "utils/api";
import axios from "axios";
import { Creators as SkillsActions } from "store/ducks/Skills";

export const skills =
  (url = COMPANY.SKILLS.skills) =>
  async (dispatch) => {
    dispatch(SkillsActions.skillsRequest());
    const req = axios({
      url,
      headers: {
        Accept: "Application/json",
      },
    });
    await req
      .then((response) => SkillsActions.skillsSuccess(response?.data?.data))
      .catch((err) => SkillsActions.skillsFailure(err));
    return req;
  };

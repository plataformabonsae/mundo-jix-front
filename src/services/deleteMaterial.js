import { Creators as DeleteMaterialActions } from "store/ducks/DeleteMaterial";
import { TALENT, COMPANY } from "utils/api";
import axios from "axios";

export const forum =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa"
      ? COMPANY.CHALLENGES.deleteMaterial
      : TALENT.CHALLENGES.deleteMaterial
  ) =>
  async (dispatch) => {
    dispatch(DeleteMaterialActions.deleteMaterialRequest());
    const res = axios({
      url: url(body.challenge_id),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(
          DeleteMaterialActions.deleteMaterialSuccess(response?.data?.data)
        )
      )
      .catch((error) =>
        dispatch(DeleteMaterialActions.deleteMaterialFailure(error))
      );
    return res;
  };

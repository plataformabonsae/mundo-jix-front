import { Creators as InvitesActions } from "store/ducks/Invites";

import { TALENT, COMPANY } from "utils/api";
import axios from "axios";

export const invites =
  (
    type = "talento",
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.INVITES.invites : TALENT.INVITES.invites
  ) =>
  async (dispatch) => {
    dispatch(InvitesActions.invitesRequest());
    const res = axios({
      url,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(InvitesActions.invitesSuccess(response?.data?.data))
      )
      .catch((error) => dispatch(InvitesActions.invitesFailure(error)));
    return res;
  };

export const accept =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.INVITES.accept : TALENT.INVITES.accept
  ) =>
  async (dispatch) => {
    dispatch(InvitesActions.invitesRequest());
    const res = axios({
      url: url(body.team_id),
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(InvitesActions.invitesSuccess(response?.data?.data))
      )
      .catch((error) => dispatch(InvitesActions.invitesFailure(error)));
    return res;
  };

export const refuse =
  (
    type = "talento",
    body,
    token = window.localStorage.getItem("token"),
    url = type === "empresa" ? COMPANY.INVITES.refuse : TALENT.INVITES.refuse
  ) =>
  async (dispatch) => {
    dispatch(InvitesActions.invitesRequest());
    const res = axios({
      url: url(body.team_id),
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    await res
      .then((response) =>
        dispatch(InvitesActions.invitesSuccess(response?.data?.data))
      )
      .catch((error) => dispatch(InvitesActions.invitesFailure(error)));
    return res;
  };

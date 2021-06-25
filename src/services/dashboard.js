import { Creators as DashActions } from "store/ducks/Dashboard";
import { TALENT, COMPANY } from "utils/api";

export const dashboardFetch =
  (
    type = "talento",
    token = window.localStorage.getItem("token"),
    url = type === `empresa`
      ? COMPANY.DASHBOARD.dashboard
      : TALENT.DASHBOARD.dashboard
  ) =>
  async (dispatch) => {
    try {
      dispatch(DashActions.dashboardRequest());
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      console.log(type);
      const { data } = await response.json();
      dispatch(DashActions.dashboardSuccess(data));
      return data;
    } catch (error) {
      dispatch(DashActions.dashboardFailure(error));
    }
  };
